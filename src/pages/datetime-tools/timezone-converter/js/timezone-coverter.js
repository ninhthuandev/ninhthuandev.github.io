const darkFlatpickrThemeLink = document.createElement('link');
darkFlatpickrThemeLink.id = 'darkFlatpickrTheme';
darkFlatpickrThemeLink.rel = 'stylesheet';
darkFlatpickrThemeLink.href = 'https://npmcdn.com/flatpickr/dist/themes/dark.css';

const FLATPICKR_DATE_FORMAT = 'Y-m-d H:i:S';
const NORMAL_DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';

document.addEventListener('alpine:init', () => {
    Alpine.effect(() => {
        const themeValue = Alpine.store('theme').value;
        if (themeValue === 'dark') {
            const darkFlatpickrThemeLinkElement = document.querySelector('#darkFlatpickrTheme');
            if (!darkFlatpickrThemeLinkElement) {
                document.head.appendChild(darkFlatpickrThemeLink);
            }
        } else {
            document.querySelector('#darkFlatpickrTheme')?.remove();
        }
    });

    let currentDate = new Date();
    let currentDateTimeWithFormat = flatpickr.formatDate(currentDate, FLATPICKR_DATE_FORMAT);
    let currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let supportedTimeZones = Intl.supportedValuesOf('timeZone');
    let supportedTimeZonesAndOffsets = supportedTimeZones.map(timeZone => {
        const GmtOffset = luxon.DateTime.local().setZone(timeZone).offsetNameShort;
        return {
            timeZone: timeZone,
            offset: GmtOffset,
            toString() {
                return `${this.timeZone} (${this.offset})`;
            }
        };
    });

    Alpine.store('timeZone', {
        isNow: false,
        supportedTimeZonesAndOffsets: supportedTimeZonesAndOffsets,
        inputDateTime: currentDateTimeWithFormat,
        outputDateTime: '',
        inputTimeZone: currentTimeZone,
        outputTimeZone: supportedTimeZones[0],

        intervalSetDatetime: null,

        updateDatetimeToNow($event) {
            this.isNow = $event.target.checked;
            if (this.isNow) {
                this.clearDatetimeNow();
                this.intervalSetDatetime = setInterval(() => {
                    this.inputDateTime = flatpickr.formatDate(new Date(), FLATPICKR_DATE_FORMAT);
                    this.convertTZ();
                }, 1000);
            } else {
                this.clearDatetimeNow();
            }
        },
        clearDatetimeNow() {
            if (this.intervalSetDatetime) {
                clearInterval(this.intervalSetDatetime);
                this.intervalSetDatetime = null;
            }
        },
        changeInputDateTime(event) {
            this.convertTZ();
        },
        convertTZ() {
            console.log(this.inputDateTime, this.inputTimeZone, this.outputTimeZone);
            const luxonInputDate = luxon.DateTime.fromFormat(this.inputDateTime, NORMAL_DATE_FORMAT, {zone: this.inputTimeZone});
            const luxonOutputDate = luxonInputDate.setZone(this.outputTimeZone);
            this.outputDateTime = luxonOutputDate.toFormat(NORMAL_DATE_FORMAT);
            console.log(this.outputDateTime);
        }
    });

    const flatpickrConfig = {
        enableTime: true,
        dateFormat: FLATPICKR_DATE_FORMAT,
        defaultDate: currentDateTimeWithFormat,
        enableSeconds: true,
        onValueUpdate: function (selectedDates, dateStr, instance) {
            Alpine.store('timeZone').inputDateTime = dateStr;
        }
    };
    flatpickr("#datetime-picker-input", flatpickrConfig);

    const autoCompleteConfig = {
        selector: "#autoComplete",
        placeHolder: "Search for Food...",
        data: {
            src: supportedTimeZonesAndOffsets,
            cache: true,
        },
        resultsList: {
            maxResults: 10000,
            element: (list, data) => {
                if (!data.results.length) {
                    // Create "No Results" message element
                    const message = document.createElement("div");
                    // Add class to the created element
                    message.setAttribute("class", "no_result");
                    // Add message text content
                    message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
                    // Append message element to the results list
                    list.prepend(message);
                }
            },
            noResults: true,
        },
        resultItem: {
            highlight: true
        },
    };


    const autoCompleteInputTimeZone = new autoComplete({
        ...autoCompleteConfig,
        selector: "#autoCompleteInputTimeZone",
        events: {
            input: {
                focus: (event) => {
                    autoCompleteInputTimeZone.start(' ');
                    const index = supportedTimeZonesAndOffsets.findIndex(timeZone => timeZone.timeZone === Alpine.store('timeZone').inputTimeZone);
                    setTimeout(() => {
                        autoCompleteInputTimeZone.goTo(index);
                    }, 0);
                },
                selection: (event) => {
                    const selection = event.detail.selection.value;
                    autoCompleteInputTimeZone.input.value = selection.toString();
                    Alpine.store('timeZone').inputTimeZone = selection.timeZone;
                    Alpine.store('timeZone').convertTZ();

                    autoCompleteInputTimeZone.input.blur();
                }
            },
            list: {
                scroll: (event) => {
                    console.log("Results List scrolled!");
                }
            }
        }
    });
    autoCompleteInputTimeZone.input.value = supportedTimeZonesAndOffsets.find(timeZone => timeZone.timeZone === currentTimeZone).toString();

    const autoCompleteOutputTimeZone = new autoComplete({
        ...autoCompleteConfig,
        selector: "#autoCompleteOutputTimeZone",
        events: {
            input: {
                focus: (event) => {
                    autoCompleteOutputTimeZone.start(' ');
                    const index = supportedTimeZonesAndOffsets.findIndex(timeZone => timeZone.timeZone === Alpine.store('timeZone').inputTimeZone);
                    setTimeout(() => {
                        autoCompleteOutputTimeZone.goTo(index);
                    }, 0);
                },
                selection: (event) => {
                    const selection = event.detail.selection.value;
                    autoCompleteOutputTimeZone.input.value = selection.toString();
                    Alpine.store('timeZone').outputTimeZone = selection.timeZone;
                    Alpine.store('timeZone').convertTZ();

                    autoCompleteOutputTimeZone.input.blur();
                }
            },
            list: {
                scroll: (event) => {
                    console.log("Results List scrolled!");
                }
            }
        }
    });
    autoCompleteOutputTimeZone.input.value = supportedTimeZonesAndOffsets[0].toString();

    Alpine.store('timeZone').convertTZ();
});
function getLocalTime(timezone) {

    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: timezone
    };

    const formatter = new Intl.DateTimeFormat([], options);
    return formatter.format(new Date());

}

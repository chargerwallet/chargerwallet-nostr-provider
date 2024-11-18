export var EventKind;
(function (EventKind) {
    EventKind[EventKind["Metadata"] = 0] = "Metadata";
    EventKind[EventKind["Text"] = 1] = "Text";
    EventKind[EventKind["RelayRec"] = 2] = "RelayRec";
    EventKind[EventKind["Contacts"] = 3] = "Contacts";
    EventKind[EventKind["DM"] = 4] = "DM";
    EventKind[EventKind["Deleted"] = 5] = "Deleted";
})(EventKind || (EventKind = {}));
const PROVIDER_EVENTS = {
    'connect': 'connect',
    'disconnect': 'disconnect',
    'accountChanged': 'accountChanged',
    'message_low_level': 'message_low_level',
};

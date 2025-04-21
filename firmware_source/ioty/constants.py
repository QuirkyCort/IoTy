_VERSION = 15
_BOOT_PIN = 0
_LED_PIN = 2
_LED_ON = 1
_PRESERVE_FILES = (
'_ioty_name',
'_ioty_network',
'boot.py',
'ioty',
'ioty/ble.mpy',
'ioty/constants.mpy',
'ioty/http.mpy',
'ioty/monitor.mpy',
'ioty/monitor_mqtt.mpy',
'ioty/mqtt.mpy',
'ioty/pin.mpy',
'ioty/html',
'ioty/html/index.html',
'umqtt',
'umqtt/robust.mpy',
'umqtt/simple.mpy'
)
_ALLOW_WRITE = (
'_ioty_name',
'_ioty_network'
)
_ALLOW_DELETE = (
'_ioty_network'
)
_NETWORK_CONFIGURATION_FILE = '_ioty_network'

_MODE_OPEN = 1
_MODE_APPEND = 2
_MODE_CLOSE = 3
_MODE_DELETE_ALL = 4
_MODE_GET_VERSION = 5
_MODE_LIST = 6
_MODE_READ = 7
_MODE_DELETE = 8
_MODE_UPDATE = 9
_MODE_FILE_HASH = 10
_MODE_WRITE_FILES = 11
_MODE_GET_INFO = 12
_MODE_MKDIR = 13
_MODE_RESET = 14
_MODE_GET_HASH = 15

_STATUS_SUCCESS = 0
_STATUS_PENDING = 1
_STATUS_FAILED = 2
_STATUS_CHECKSUM_ERROR = 3
_STATUS_ERROR = 4

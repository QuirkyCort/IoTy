from micropython import const

_VERSION = 4
_PRESERVE_FILES = ('boot.py', 'ioty', '_ioty_name', 'umqtt')

_MODE_OPEN = const(1)
_MODE_APPEND = const(2)
_MODE_CLOSE = const(3)
_MODE_DELETE_ALL = const(4)
_MODE_GET_VERSION = const(5)
_MODE_LIST = const(6)
_MODE_READ = const(7)
_MODE_DELETE = const(8)
_MODE_UPDATE = const(9)
_MODE_FILE_HASH = const(10)
_MODE_WRITE_FILES = const(11)

_STATUS_SUCCESS = const(0)
_STATUS_PENDING = const(1)
_STATUS_FAILED = const(2)
_STATUS_CHECKSUM_ERROR = const(3)
_STATUS_ERROR = const(4)

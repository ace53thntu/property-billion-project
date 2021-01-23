export const PG_SUCCESSFUL_COMPLETION = "00000";
export const PG_WARNING = "01000";
export const PG_DYNAMIC_RESULT_SETS_RETURNED = "0100C";
export const PG_IMPLICIT_ZERO_BIT_PADDING = "01008";
export const PG_NULL_VALUE_ELIMINATED_IN_SET_FUNCTION = "01003";
export const PG_PRIVILEGE_NOT_GRANTED = "01007";
export const PG_PRIVILEGE_NOT_REVOKED = "01006";
export const PG_STRING_DATA_RIGHT_TRUNCATION = "01004";
export const PG_DEPRECATED_FEATURE = "01P01";
export const PG_NO_DATA = "02000";
export const PG_NO_ADDITIONAL_DYNAMIC_RESULT_SETS_RETURNED = "02001";
export const PG_SQL_STATEMENT_NOT_YET_COMPLETE = "03000";
export const PG_CONNECTION_EXCEPTION = "08000";
export const PG_CONNECTION_DOES_NOT_EXIST = "08003";
export const PG_CONNECTION_FAILURE = "08006";
export const PG_SQLCLIENT_UNABLE_TO_ESTABLISH_SQLCONNECTION = "08001";
export const PG_SQLSERVER_REJECTED_ESTABLISHMENT_OF_SQLCONNECTION = "08004";
export const PG_TRANSACTION_RESOLUTION_UNKNOWN = "08007";
export const PG_PROTOCOL_VIOLATION = "08P01";
export const PG_TRIGGERED_ACTION_EXCEPTION = "09000";
export const PG_FEATURE_NOT_SUPPORTED = "0A000";
export const PG_INVALID_TRANSACTION_INITIATION = "0B000";
export const PG_LOCATOR_EXCEPTION = "0F000";
export const PG_INVALID_LOCATOR_SPECIFICATION = "0F001";
export const PG_INVALID_GRANTOR = "0L000";
export const PG_INVALID_GRANT_OPERATION = "0LP01";
export const PG_INVALID_ROLE_SPECIFICATION = "0P000";
export const PG_DIAGNOSTICS_EXCEPTION = "0Z000";
export const PG_STACKED_DIAGNOSTICS_ACCESSED_WITHOUT_ACTIVE_HANDLER = "0Z002";
export const PG_CASE_NOT_FOUND = "20000";
export const PG_CARDINALITY_VIOLATION = "21000";
export const PG_DATA_EXCEPTION = "22000";
export const PG_ARRAY_SUBSCRIPT_ERROR = "2202E";
export const PG_CHARACTER_NOT_IN_REPERTOIRE = "22021";
export const PG_DATETIME_FIELD_OVERFLOW = "22008";
export const PG_DIVISION_BY_ZERO = "22012";
export const PG_ERROR_IN_ASSIGNMENT = "22005";
export const PG_ESCAPE_CHARACTER_CONFLICT = "2200B";
export const PG_INDICATOR_OVERFLOW = "22022";
export const PG_INTERVAL_FIELD_OVERFLOW = "22015";
export const PG_INVALID_ARGUMENT_FOR_LOGARITHM = "2201E";
export const PG_INVALID_ARGUMENT_FOR_NTILE_FUNCTION = "22014";
export const PG_INVALID_ARGUMENT_FOR_NTH_VALUE_FUNCTION = "22016";
export const PG_INVALID_ARGUMENT_FOR_POWER_FUNCTION = "2201F";
export const PG_INVALID_ARGUMENT_FOR_WIDTH_BUCKET_FUNCTION = "2201G";
export const PG_INVALID_CHARACTER_VALUE_FOR_CAST = "22018";
export const PG_INVALID_DATETIME_FORMAT = "22007";
export const PG_INVALID_ESCAPE_CHARACTER = "22019";
export const PG_INVALID_ESCAPE_OCTET = "2200D";
export const PG_INVALID_ESCAPE_SEQUENCE = "22025";
export const PG_NONSTANDARD_USE_OF_ESCAPE_CHARACTER = "22P06";
export const PG_INVALID_INDICATOR_PARAMETER_VALUE = "22010";
export const PG_INVALID_PARAMETER_VALUE = "22023";
export const PG_INVALID_REGULAR_EXPRESSION = "2201B";
export const PG_INVALID_ROW_COUNT_IN_LIMIT_CLAUSE = "2201W";
export const PG_INVALID_ROW_COUNT_IN_RESULT_OFFSET_CLAUSE = "2201X";
export const PG_INVALID_TIME_ZONE_DISPLACEMENT_VALUE = "22009";
export const PG_INVALID_USE_OF_ESCAPE_CHARACTER = "2200C";
export const PG_MOST_SPECIFIC_TYPE_MISMATCH = "2200G";
export const PG_NULL_VALUE_NOT_ALLOWED = "22004";
export const PG_NULL_VALUE_NO_INDICATOR_PARAMETER = "22002";
export const PG_NUMERIC_VALUE_OUT_OF_RANGE = "22003";
export const PG_STRING_DATA_LENGTH_MISMATCH = "22026";
export const PG_DATA_STRING_DATA_RIGHT_TRUNCATION = "22001";
export const PG_SUBSTRING_ERROR = "22011";
export const PG_TRIM_ERROR = "22027";
export const PG_UNTERMINATED_C_STRING = "22024";
export const PG_ZERO_LENGTH_CHARACTER_STRING = "2200F";
export const PG_FLOATING_POINT_EXCEPTION = "22P01";
export const PG_INVALID_TEXT_REPRESENTATION = "22P02";
export const PG_INVALID_BINARY_REPRESENTATION = "22P03";
export const PG_BAD_COPY_FILE_FORMAT = "22P04";
export const PG_UNTRANSLATABLE_CHARACTER = "22P05";
export const PG_NOT_AN_XML_DOCUMENT = "2200L";
export const PG_INVALID_XML_DOCUMENT = "2200M";
export const PG_INVALID_XML_CONTENT = "2200N";
export const PG_INVALID_XML_COMMENT = "2200S";
export const PG_INVALID_XML_PROCESSING_INSTRUCTION = "2200T";
export const PG_INTEGRITY_CONSTRAINT_VIOLATION = "23000";
export const PG_RESTRICT_VIOLATION = "23001";
export const PG_NOT_NULL_VIOLATION = "23502";
export const PG_FOREIGN_KEY_VIOLATION = "23503";
export const PG_UNIQUE_VIOLATION = "23505";
export const PG_CHECK_VIOLATION = "23514";
export const PG_EXCLUSION_VIOLATION = "23P01";
export const PG_INVALID_CURSOR_STATE = "24000";
export const PG_INVALID_TRANSACTION_STATE = "25000";
export const PG_ACTIVE_SQL_TRANSACTION = "25001";
export const PG_BRANCH_TRANSACTION_ALREADY_ACTIVE = "25002";
export const PG_HELD_CURSOR_REQUIRES_SAME_ISOLATION_LEVEL = "25008";
export const PG_INAPPROPRIATE_ACCESS_MODE_FOR_BRANCH_TRANSACTION = "25003";
export const PG_INAPPROPRIATE_ISOLATION_LEVEL_FOR_BRANCH_TRANSACTION = "25004";
export const PG_NO_ACTIVE_SQL_TRANSACTION_FOR_BRANCH_TRANSACTION = "25005";
export const PG_READ_ONLY_SQL_TRANSACTION = "25006";
export const PG_SCHEMA_AND_DATA_STATEMENT_MIXING_NOT_SUPPORTED = "25007";
export const PG_NO_ACTIVE_SQL_TRANSACTION = "25P01";
export const PG_IN_FAILED_SQL_TRANSACTION = "25P02";
export const PG_INVALID_SQL_STATEMENT_NAME = "26000";
export const PG_TRIGGERED_DATA_CHANGE_VIOLATION = "27000";
export const PG_INVALID_AUTHORIZATION_SPECIFICATION = "28000";
export const PG_INVALID_PASSWORD = "28P01";
export const PG_DEPENDENT_PRIVILEGE_DESCRIPTORS_STILL_EXIST = "2B000";
export const PG_DEPENDENT_OBJECTS_STILL_EXIST = "2BP01";
export const PG_INVALID_TRANSACTION_TERMINATION = "2D000";
export const PG_SQL_ROUTINE_EXCEPTION = "2F000";
export const PG_FUNCTION_EXECUTED_NO_RETURN_STATEMENT = "2F005";
export const PG_SQL_ROUTINE_MODIFYING_SQL_DATA_NOT_PERMITTED = "2F002";
export const PG_SQL_ROUTINE_PROHIBITED_SQL_STATEMENT_ATTEMPTED = "2F003";
export const PG_SQL_ROUTINE_READING_SQL_DATA_NOT_PERMITTED = "2F004";
export const PG_INVALID_CURSOR_NAME = "34000";
export const PG_EXTERNAL_ROUTINE_EXCEPTION = "38000";
export const PG_CONTAINING_SQL_NOT_PERMITTED = "38001";
export const PG_EXTERNAL_ROUTINE_MODIFYING_SQL_DATA_NOT_PERMITTED = "38002";
export const PG_EXTERNAL_ROUTINE_PROHIBITED_SQL_STATEMENT_ATTEMPTED = "38003";
export const PG_EXTERNAL_ROUTINE_READING_SQL_DATA_NOT_PERMITTED = "38004";
export const PG_EXTERNAL_ROUTINE_INVOCATION_EXCEPTION = "39000";
export const PG_INVALID_SQLSTATE_RETURNED = "39001";
export const PG_EXTERNAL_ROUTINE_NULL_VALUE_NOT_ALLOWED = "39004";
export const PG_TRIGGER_PROTOCOL_VIOLATED = "39P01";
export const PG_SRF_PROTOCOL_VIOLATED = "39P02";
export const PG_SAVEPOINT_EXCEPTION = "3B000";
export const PG_INVALID_SAVEPOINT_SPECIFICATION = "3B001";
export const PG_INVALID_CATALOG_NAME = "3D000";
export const PG_INVALID_SCHEMA_NAME = "3F000";
export const PG_TRANSACTION_ROLLBACK = "40000";
export const PG_TRANSACTION_INTEGRITY_CONSTRAINT_VIOLATION = "40002";
export const PG_SERIALIZATION_FAILURE = "40001";
export const PG_STATEMENT_COMPLETION_UNKNOWN = "40003";
export const PG_DEADLOCK_DETECTED = "40P01";
export const PG_SYNTAX_ERROR_OR_ACCESS_RULE_VIOLATION = "42000";
export const PG_SYNTAX_ERROR = "42601";
export const PG_INSUFFICIENT_PRIVILEGE = "42501";
export const PG_CANNOT_COERCE = "42846";
export const PG_GROUPING_ERROR = "42803";
export const PG_WINDOWING_ERROR = "42P20";
export const PG_INVALID_RECURSION = "42P19";
export const PG_INVALID_FOREIGN_KEY = "42830";
export const PG_INVALID_NAME = "42602";
export const PG_NAME_TOO_LONG = "42622";
export const PG_RESERVED_NAME = "42939";
export const PG_DATATYPE_MISMATCH = "42804";
export const PG_INDETERMINATE_DATATYPE = "42P18";
export const PG_COLLATION_MISMATCH = "42P21";
export const PG_INDETERMINATE_COLLATION = "42P22";
export const PG_WRONG_OBJECT_TYPE = "42809";
export const PG_UNDEFINED_COLUMN = "42703";
export const PG_UNDEFINED_FUNCTION = "42883";
export const PG_UNDEFINED_TABLE = "42P01";
export const PG_UNDEFINED_PARAMETER = "42P02";
export const PG_UNDEFINED_OBJECT = "42704";
export const PG_DUPLICATE_COLUMN = "42701";
export const PG_DUPLICATE_CURSOR = "42P03";
export const PG_DUPLICATE_DATABASE = "42P04";
export const PG_DUPLICATE_FUNCTION = "42723";
export const PG_DUPLICATE_PREPARED_STATEMENT = "42P05";
export const PG_DUPLICATE_SCHEMA = "42P06";
export const PG_DUPLICATE_TABLE = "42P07";
export const PG_DUPLICATE_ALIAS = "42712";
export const PG_DUPLICATE_OBJECT = "42710";
export const PG_AMBIGUOUS_COLUMN = "42702";
export const PG_AMBIGUOUS_FUNCTION = "42725";
export const PG_AMBIGUOUS_PARAMETER = "42P08";
export const PG_AMBIGUOUS_ALIAS = "42P09";
export const PG_INVALID_COLUMN_REFERENCE = "42P10";
export const PG_INVALID_COLUMN_DEFINITION = "42611";
export const PG_INVALID_CURSOR_DEFINITION = "42P11";
export const PG_INVALID_DATABASE_DEFINITION = "42P12";
export const PG_INVALID_FUNCTION_DEFINITION = "42P13";
export const PG_INVALID_PREPARED_STATEMENT_DEFINITION = "42P14";
export const PG_INVALID_SCHEMA_DEFINITION = "42P15";
export const PG_INVALID_TABLE_DEFINITION = "42P16";
export const PG_INVALID_OBJECT_DEFINITION = "42P17";
export const PG_WITH_CHECK_OPTION_VIOLATION = "44000";
export const PG_INSUFFICIENT_RESOURCES = "53000";
export const PG_DISK_FULL = "53100";
export const PG_OUT_OF_MEMORY = "53200";
export const PG_TOO_MANY_CONNECTIONS = "53300";
export const PG_CONFIGURATION_LIMIT_EXCEEDED = "53400";
export const PG_PROGRAM_LIMIT_EXCEEDED = "54000";
export const PG_STATEMENT_TOO_COMPLEX = "54001";
export const PG_TOO_MANY_COLUMNS = "54011";
export const PG_TOO_MANY_ARGUMENTS = "54023";
export const PG_OBJECT_NOT_IN_PREREQUISITE_STATE = "55000";
export const PG_OBJECT_IN_USE = "55006";
export const PG_CANT_CHANGE_RUNTIME_PARAM = "55P02";
export const PG_LOCK_NOT_AVAILABLE = "55P03";
export const PG_OPERATOR_INTERVENTION = "57000";
export const PG_QUERY_CANCELED = "57014";
export const PG_ADMIN_SHUTDOWN = "57P01";
export const PG_CRASH_SHUTDOWN = "57P02";
export const PG_CANNOT_CONNECT_NOW = "57P03";
export const PG_DATABASE_DROPPED = "57P04";
export const PG_SYSTEM_ERROR = "58000";
export const PG_IO_ERROR = "58030";
export const PG_UNDEFINED_FILE = "58P01";
export const PG_DUPLICATE_FILE = "58P02";
export const PG_CONFIG_FILE_ERROR = "F0000";
export const PG_LOCK_FILE_EXISTS = "F0001";
export const PG_FDW_ERROR = "HV000";
export const PG_FDW_COLUMN_NAME_NOT_FOUND = "HV005";
export const PG_FDW_DYNAMIC_PARAMETER_VALUE_NEEDED = "HV002";
export const PG_FDW_FUNCTION_SEQUENCE_ERROR = "HV010";
export const PG_FDW_INCONSISTENT_DESCRIPTOR_INFORMATION = "HV021";
export const PG_FDW_INVALID_ATTRIBUTE_VALUE = "HV024";
export const PG_FDW_INVALID_COLUMN_NAME = "HV007";
export const PG_FDW_INVALID_COLUMN_NUMBER = "HV008";
export const PG_FDW_INVALID_DATA_TYPE = "HV004";
export const PG_FDW_INVALID_DATA_TYPE_DESCRIPTORS = "HV006";
export const PG_FDW_INVALID_DESCRIPTOR_FIELD_IDENTIFIER = "HV091";
export const PG_FDW_INVALID_HANDLE = "HV00B";
export const PG_FDW_INVALID_OPTION_INDEX = "HV00C";
export const PG_FDW_INVALID_OPTION_NAME = "HV00D";
export const PG_FDW_INVALID_STRING_LENGTH_OR_BUFFER_LENGTH = "HV090";
export const PG_FDW_INVALID_STRING_FORMAT = "HV00A";
export const PG_FDW_INVALID_USE_OF_NULL_POINTER = "HV009";
export const PG_FDW_TOO_MANY_HANDLES = "HV014";
export const PG_FDW_OUT_OF_MEMORY = "HV001";
export const PG_FDW_NO_SCHEMAS = "HV00P";
export const PG_FDW_OPTION_NAME_NOT_FOUND = "HV00J";
export const PG_FDW_REPLY_HANDLE = "HV00K";
export const PG_FDW_SCHEMA_NOT_FOUND = "HV00Q";
export const PG_FDW_TABLE_NOT_FOUND = "HV00R";
export const PG_FDW_UNABLE_TO_CREATE_EXECUTION = "HV00L";
export const PG_FDW_UNABLE_TO_CREATE_REPLY = "HV00M";
export const PG_FDW_UNABLE_TO_ESTABLISH_CONNECTION = "HV00N";
export const PG_PLPGSQL_ERROR = "P0000";
export const PG_RAISE_EXCEPTION = "P0001";
export const PG_NO_DATA_FOUND = "P0002";
export const PG_TOO_MANY_ROWS = "P0003";
export const PG_INTERNAL_ERROR = "XX000";
export const PG_DATA_CORRUPTED = "XX001";
export const PG_INDEX_CORRUPTED = "XX002";

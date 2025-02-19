
import sys
import loguru
from loguru import logger


fmt = "{time:MMMM D, YYYY - HH:mm:ss} - {name} - {level} - {message}"

logger.add("logs/running.log", level="INFO", format=fmt)
#logger.add("logs/running.log", level="ERROR", format=fmt)
#logger = loguru.getLogger(__name__)
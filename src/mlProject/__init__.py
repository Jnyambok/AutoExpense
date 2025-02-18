import os
import sys
import loguru
from loguru import logger


#Making the logs directory
log_dir = "logs"
log_filepath = os.path.join(log_dir, "running.log")
os.makedirs(log_dir, exist_ok=True)



logger = loguru.getLogger(__name__)
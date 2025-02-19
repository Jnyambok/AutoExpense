from src.mlProject import logger

#logger.error(3/0)


def add(a, b):
    logger.info(f"Adding {a} and {b} as an example")
    return a + b

logger.info(add(1, 2))
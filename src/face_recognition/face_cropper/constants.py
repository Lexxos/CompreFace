from enum import IntEnum
from typing import Union


class FaceLimitConstant(IntEnum):
    """
    >>> bool(FaceLimitConstant.NO_LIMIT)  # Because implicit cast to bool is used for this constant
    False
    """
    NO_LIMIT = 0


FaceLimit = Union[FaceLimitConstant, int]

FACE_MIN_SIZE = 20
THRESHOLD = [0.6, 0.7, 0.7]  # three steps's threshold
SCALE_FACTOR = 0.709
MARGIN = 32
IMAGE_SIZE = 160

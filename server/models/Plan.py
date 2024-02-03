from enum import Enum

class PlanEnum(Enum):
    FREE_PLAN = 0
    STARTER_PLAN = 1
    PERSONAL_PLAN = 2

class Plan:
    FREE_PLAN_DETAILS = {
        "title": "Free Plan",
        "code": PlanEnum.FREE_PLAN,
        "description": ["5 GB Storage", "10 GB Download", "Client Side Encryption", "Durable Storage"],
        "original_price": 0,
        "price": 0,
        "currency": "$"
    }

    STARTER_PLAN_DETAILS = {
        "title": "Starter Plan",
        "code": PlanEnum.STARTER_PLAN,
        "description": ["100 GB Storage", "200 GB Download", "Client Side Encryption", "Durable Storage"],
        "original_price": 15,
        "price": 10,
        "currency": "$"
    }

    PERSONAL_PLAN_DETAILS = {
        "title": "Personal Plan",
        "code": PlanEnum.PERSONAL_PLAN,
        "description": ["2 TB Storage", "4 TB Download",  "Client Side Encryption", "Durable Storage"],
        "original_price": 90,
        "price": 80,
        "currency": "$"
    }

    def __init__(self, plan_code):
        self.plan_code = plan_code
        self.title = ""
        self.description = []
        self.original_price = 0
        self.price = 0
        self.currency = ""

        self.__set_plan_details()

    def __set_plan_details(self):
        if self.plan_code == PlanEnum.FREE_PLAN:
            self.__dict__.update(self.FREE_PLAN_DETAILS)
        elif self.plan_code == PlanEnum.STARTER_PLAN:
            self.__dict__.update(self.STARTER_PLAN_DETAILS)
        elif self.plan_code == PlanEnum.PERSONAL_PLAN:
            self.__dict__.update(self.PERSONAL_PLAN_DETAILS)
        else:
            raise ValueError("Invalid plan code")

def parse_plan_enum(value):
    try:
        return PlanEnum[value.upper()]
    except KeyError:
        raise ValueError(f"Invalid PlanEnum value: {value}")

in_memory_users = {}

def save_user(user):
    in_memory_users[user.id] = user

def get_user(id):
    return in_memory_users.get(id, None)
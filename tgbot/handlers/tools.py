import pandas as pd

def check_user(user_id):
  user_id = int(user_id)
  users = pd.read_csv('users.csv')
  users = users[users['user_id'] == user_id]['is_active']

  if (users.shape[0] == 0):
    return None
  
  return users.values[0]

def add_user(user):
  users = pd.read_csv('users.csv')
  users.loc[users.shape[0]] = [user.id, user.first_name, user.last_name, user.username, False]
  users.drop_duplicates(subset=['user_id'], inplace=True)
  users.to_csv('users.csv', index=False)

def activate_user(user_id):
  user_id = int(user_id)
  users = pd.read_csv('users.csv')
  users.loc[users['user_id'] == user_id, 'is_active'] = True
  users.to_csv('users.csv', index=False)

def get_ids():
  users = pd.read_csv('users.csv')
  ids = users['user_id'].values

  return ids
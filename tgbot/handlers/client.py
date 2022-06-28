from aiogram import types, Dispatcher

from create_bot import dp, bot
from handlers import tools
from handlers.admin import send_to_admin


async def command_start(message: types.Message):
  text = 'Перед использованием бота напишите \n/signup, чтобы зарегистрироваться'
  await bot.send_message(message.from_user.id, text)


async def signup(message: types.Message):
  user = message.from_user
  check = tools.check_user(user.id)
  if (check is None):
    tools.add_user(user)

    await send_to_admin(user)
    await message.answer('Заявка отправлена админу @Andrew_Isupov')
  elif (check == False):
    await message.answer('Заявка уже отправлена')
  elif (check == True):
    await message.answer('Вы уже зарегистрированы')


async def get_messages(message: types.Message):
  check = tools.check_user(message.from_user.id)

  if (check == True):
    with open('../backend/messages.txt', 'r') as file:
      lines = file.readlines()
      text = '\n\n'.join(lines[-3:])
      await message.answer(text)
  else:
    await message.answer('У вас нет доступа!')


def register_handlers(dp: Dispatcher):
  dp.register_message_handler(command_start, commands=['start'])
  dp.register_message_handler(signup, commands=['signup'])
  dp.register_message_handler(get_messages, commands=['get'])
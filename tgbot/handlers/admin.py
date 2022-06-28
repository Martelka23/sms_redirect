import pandas as pd
from aiogram import types, Dispatcher
from aiogram.dispatcher.filters import Text
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton

from handlers import tools
from create_bot import bot, dp

admin_id = 791014661

async def send_to_admin(user):
  kb = InlineKeyboardMarkup(row_width=1)
  btn = InlineKeyboardButton(text='Подтвердить', callback_data=f'Activate {user.id}')
  kb.add(btn)
  text = f'Запрос на регистрацию\n{user.id}\n{user.first_name}\n{user.last_name}\n{user.username}'

  await bot.send_message(admin_id, text, reply_markup=kb)


async def activate(callback: types.CallbackQuery):
  user_id = int(callback.data.split()[1])

  if (callback.from_user.id == admin_id):
    tools.activate_user(user_id)

    await bot.send_message(user_id, 'Доступ предоставлен.\nИспользуйте /get для просмотра сообщений')
    await callback.message.answer(callback.data)
  else:
    await callback.answer('Вы не админ')

async def send_all(message: types.Message):
  text = ' '.join(message.text.split()[1:])
  ids = tools.get_ids()

  if (message.from_user.id == admin_id):
    for user_id in ids:
      try:
        await bot.send_message(user_id, text)
      except Exception as e:
        continue

    await message.answer('Рассылка завершена')
  else:
    await message.answer('Вы не админ')


def register_handlers(dp: Dispatcher):
  dp.register_callback_query_handler(activate, Text(startswith='Activate'))
  dp.register_message_handler(send_all, commands=['send'])
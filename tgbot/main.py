from aiogram.utils import executor

from create_bot import dp
from handlers import client, admin, tools

async def on_startup(_):
  print('Bot started...')

client.register_handlers(dp)
admin.register_handlers(dp)

executor.start_polling(dp, skip_updates=True, on_startup=on_startup)
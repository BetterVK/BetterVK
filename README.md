# BetterVK

### ПРОЧИТАЙ ПОЖАЛУЙСТА МЕНЯ ПЕРВЫМ

## О проекте

Проект делается одним тупеньким школьником которые пытается сделать аналог беттердс, но для ВК Мессенджера.

## Еще больше информации

* В планах доделать поддержку плагинов

* Лоадер грузит из bur/core.js джаваскрипт файл который и запускается как меню со всеми плагинами и тому подобным

## Как запустить это все самому?

Берешь и делаешь так:
1. Ставишь ВК Мессенджер
2. Ищещь там asar
3. Делаешь:
``` bash
npx asar extract путь/до/app.asar ./кудараспакуешь
```
4. Открываешь:
```
кудараспаковал/packages/preload/dist/entryVkm.js 
```
5. Там в конце файла добавляешь лоадер из ```loader/NOTASJS.CHECKREADMEFIRST```
6. Берешь и пакуешь:
``` bash
npx asar pack кудараспакавал/ app.asar
```
7. В ориг ВК мессенджер старый app.asar бакапишь и выкидываешь из дома, ставишь свой собственный аппасар который ты сделал в 6 пункте
8. Запускаешь и тыкаешь cmd+option+i (на маке) или f12 (idk)
9. В консоли смотришь запустилось ли оно


 

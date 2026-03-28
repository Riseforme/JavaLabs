<h1>Шаг 1. Создание класса Item</h1>

```js
class Item {
    /**
     * Создаёт новый предмет.
     * @param {string} [name=''] - Название предмета.
     * @param {number} [weight=0] - Вес предмета.
     * @param {"common"|"uncommon"|"rare"|"legendary"} [rarity] - Редкость предмета.
     */

    constructor(name = '', weight = 0, rarity = "common") {
        this.name = name;
        this.weight = weight;
        if (rarity != "common" && rarity != "uncommon" && rarity != "rare" && rarity != "legendary") {
            console.log("Неверное значение параметра 'rarity', было установлено значение по умолчанию!");
            rarity = "common";
        }
        this.rarity = rarity;
    }
    /**
     * Возвращает строку с информацией о предмете.
     * @returns {string} Информация о предмете.
    */
    getInfo() {
        return `Название: ${this.name}, вес: ${this.weight}, редкость: ${this.rarity}`;
    }
    /**
     * Устанавливает новый вес предмета.
     * @param {number} newWeight - Новый вес предмета (> 0).
     */
    setWeight(newWeight) {
        if (!newWeight || newWeight <= 0) {
            console.log("Неверное значение!");
            return;
        }
        this.weight = newWeight;
    }
}
```

<h1>Шаг 2. Создание класса Weapon</h1>

```js
/**
 * Класс, представляющий оружие (наследует Item).
 * @extends Item
 */
class Weapon extends Item {
    /**
     * Создаёт новое оружие.
     * @param {string} [name=''] - Название оружия.
     * @param {number} [weight=0] - Вес оружия.
     * @param {"common"|"uncommon"|"rare"|"legendary"} [rarity] - Редкость оружия.
     * @param {number} [damage=0] - Урон оружия.
     * @param {number} [durability=100] - Прочность оружия (0–100).
    */
    constructor(name = '', weight = 0, rarity = "common", damage = 0, durability = 100) {
        super(name, weight, rarity);

        if (damage < 0) {
            console.log("Неверное значение параметра 'damage', было установлено значение по умолчанию!");
            damage = 0;
        }
        if (durability < 0 || durability > 100) {
            console.log("Неверное значение параметра 'durability', было установлено значение по умолчанию!");
            durability = 100;
        }

        this.damage = damage;
        this.durability = durability;
    }
    /**
     * Использует оружие: уменьшает прочность на 10, если оно не сломано.
    */
    use() {
        if (this.durability > 10) 
            this.durability -= 10;
        else
            console.log("Оружие сломано!"); 
    }
    /**
        * Ремонтирует оружие: восстанавливает прочность до 100.
    */
    repair() {
        if (this.durability === 100)
            console.log("Оружие целое!");
        else
            this.durability = 100;
    }
    /**
     * Возвращает строку с информацией об оружии.
     * @returns {string} Информация об оружии.
    */
    getInfo() {
        return super.getInfo() + `, урон: ${this.damage}, прочность: ${this.durability}`;
    }
}
```

<h1>Шаг 3. Тестирование</h1>

```js
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword?.getInfo());
sword?.setWeight(4.0);
console.log(sword?.getInfo());

const weapon = new Weapon("Пушка", 100, "legendary", 1000, 100)
console.log(weapon?.getInfo());
weapon?.use();
console.log(weapon?.getInfo());
weapon?.repair();
console.log(weapon?.getInfo());
```

<h1>Шаг 4. Функция-конструктор и опциональная цепочка</h1>

```js

function Item2(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

Item2.prototype.getInfo = function() {
  return `${this.name} (Вес: ${this.weight}, Редкость: ${this.rarity})`;
};

Item2.prototype.setWeight = function(newWeight) {
  this.weight = newWeight;
};


function Weapon2(name, weight, rarity, damage, durability) {
  Item2.call(this, name, weight, rarity);
  this.damage = damage;
  this.durability = durability;
}


Weapon2.prototype = Object.create(Item2.prototype);
Weapon2.prototype.constructor = Weapon2;

Weapon2.prototype.use = function() {
  if (this.durability > 0) {
    this.durability -= 10;
    console.log(`${this.name} использовано! Прочность: ${this.durability}`);
  } else {
    console.log(`${this.name} сломано!`);
  }
};

Weapon2.prototype.repair = function() {
  this.durability = 100;
  console.log(`${this.name} отремонтировано!`);
};

Weapon2.prototype.getInfo = function() {
  return `${Item2.prototype.getInfo.call(this)}, Урон: ${this.damage}, Прочность: ${this.durability}`;
};


const dagger = new Weapon2("Dagger", 1.2, "rare", 12, 50);
console.log(dagger?.getInfo());
dagger?.use();
```

<h1>Контрольные вопросы</h1>
1. Какое значение имеет this в методах класса? - указывает на текущий экземпляр объекта <br>
2. Как работает модификатор доступа # в JavaScript? - делает поле или метод приватным, доступным к использованию только внутри класса <br>
3. В чем разница между классами и функциями-конструкторами? - классы - это более современный, удобный синтаксис поверх прототипного наследования <br>

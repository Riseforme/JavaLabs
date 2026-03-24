transactionsArr = [
    {
        transaction_id: 0,
        transaction_type: "приход",
        transaction_date: new Date(2024, 4, 1),
        transaction_amount: 100.00,
        transaction_description: "Зарплата",
        merchant_name: "Your Company",
        card_type: "дебитовая"
    },
    {
        transaction_id: 1,
        transaction_type: "расход",
        transaction_date: new Date(2024, 4, 2), 
        transaction_amount: 50.00,
        transaction_description: "Кафе",
        merchant_name: "Local Restaurant",
        card_type: "кредитовая"
    },
    {
        transaction_id: 2,
        transaction_type: "приход",
        transaction_date: new Date(2024, 4, 3), 
        transaction_amount: 200.00,
        transaction_description: "Продажа товаров",
        merchant_name: "Online Store",
        card_type: "дебитовая"
    },
    {
        transaction_id: 3,
        transaction_type: "приход",
        transaction_date: new Date(2024, 5, 3), 
        transaction_amount: 200.00,
        transaction_description: "Продажа товаров",
        merchant_name: "Online Store",
        card_type: "дебитовая"
    }
];
/*
    Получение уникальных типов транзакций
    transactions - массив транзакций
*/
function getUniqueTransactionTypes(transactions) {
    if (!transactions || transactions.length === 0) {
        return new Set();
    }
    const uniqueTypes = new Set();
    transactions.forEach(transaction => {
        uniqueTypes.add(transaction.transaction_type);
    });

    return uniqueTypes;
}

/*
    Вычисление общей суммы транзакций
    transactions - массив транзакций
*/
calculateTotalAmount = (transactions) => {
    if (!transactions || transactions.length === 0) {
        return 0;
    }
    return transactions.reduce((tot, cutTransaction) => tot + cutTransaction.transaction_amount, 0);
};

/*
    Вычисление общей суммы транзакций по дате
    transactions - массив транзакций
    year - год (необязательный параметр)
    month - месяц (необязательный параметр)
    day - день (необязательный параметр)
*/
function calculateTotalAmountByDate(transactions, year, month, day) {
    if (!transactions || transactions.length === 0) {
        return 0;
    }
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) {
        throw new Error("Некорректная дата");
    }

    let totalAmount = 0;

    if (year && month && day) {
        totalAmount = transactions.filter(transaction => transaction.transaction_date.getFullYear() === year && transaction.transaction_date.getMonth() === month - 1 && transaction.transaction_date.getDate() === day).reduce((tot, curV) => tot + curV.transaction_amount, 0);
    } else if (year && month) {
        totalAmount = transactions.filter(transaction => transaction.transaction_date.getFullYear() === year && transaction.transaction_date.getMonth() === month - 1).reduce((tot, curV) => tot + curV.transaction_amount, 0);
    } else if (year) {
        totalAmount = transactions.filter(transaction => transaction.transaction_date.getFullYear() === year).reduce((tot, curV) => tot + curV.transaction_amount, 0);
    } else {
        totalAmount = transactions.reduce((tot, curV) => tot + curV.transaction_amount, 0);
    }

    return totalAmount;
}

/*
    Получение транзакций по типу
    transactions - массив транзакций
    type - тип транзакции
*/
function getTransactionByType(transactions, type) {
    if (!transactions || transactions.length === 0) {
        return [];
    }
    return transactions.filter(transaction => transaction.transaction_type === type);
}

/*
    Получение транзакций в заданном диапазоне дат
    transactions - массив транзакций
    startDate - начальная дата
    endDate - конечная дата
*/
function getTransactionsInDateRange(transactions, startDate, endDate) {
    if (!transactions || transactions.length === 0) {
        return [];
    }
    if (startDate > endDate || !startDate || !endDate) {
        throw new Error("Некорректные даты");
    }
    return transactions.filter(transaction => transaction.transaction_date >= startDate && transaction.transaction_date <= endDate);
}

/*
    Получение транзакций по названию торговой точки
    transactions - массив транзакций
    merchantName - название торговой точки
*/
function getTransactionsByMerchant(transactions, merchantName) {
    if (!transactions || transactions.length === 0) {
        return [];
    }
    return transactions.filter(transaction => transaction.merchant_name === merchantName);
}

/*
    Вычисление средней суммы транзакции
    transactions - массив транзакций
*/
function calculateAverageTransactionAmount(transactions) {
    if (!transactions || transactions.length === 0) return 0;

    const totalAmount = transactions.reduce((tot, curV) => tot + curV.transaction_amount, 0);

    return totalAmount / transactions.length;
}

/*
    Получение транзакций по диапазону сумм
    transactions - массив транзакций
    minAmount - минимальная сумма
    maxAmount - максимальная сумма
*/
getTransactionsByAmountRange = (transactions, minAmount, maxAmount) => {
    if (!transactions || transactions.length === 0) {
        return [];
    }
    return transactions.filter(transaction => transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount);
};

/*
    Вычисление общей суммы дебетовых транзакций
    transactions - массив транзакций
*/
calculateTotalDebitAmount = (transactions) => {
    if (!transactions || transactions.length === 0) {
        return 0;
    }
    return transactions.filter(transaction => transaction.card_type === "дебитовая").reduce((tot, curV) => tot + curV.transaction_amount, 0);
};

/*
    Нахождение месяца с наибольшим количеством транзакций
    transactions - массив транзакций
*/
findMostTransactionsMonth = (transactions) => {
    if (!transactions || transactions.length === 0) {
        return null;
    }
    const allMonths = [];

    transactions.forEach(transaction => {
        const month = transaction.transaction_date.getMonth() + 1;
        const year = transaction.transaction_date.getFullYear();
        const monthYear = `${month}-${year}`;
        allMonths.push(monthYear);
    });

    const monthCounts = allMonths.reduce((acc, month) => {
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});

    return Object.keys(monthCounts).reduce((a, b) => monthCounts[a] > monthCounts[b] ? a : b);
}

/*
    Нахождение месяца с наибольшим количеством дебетовых транзакций
    transactions - массив транзакций
*/
findMostDebitTransactionMonth = (transactions) => {
    if (!transactions || transactions.length === 0) {
        return null;
    }
    const debitMonths = [];

    transactions.forEach(tr => {
        if(tr.card_type === "дебитовая") debitMonths.push(`${tr.transaction_date.getMonth() + 1}-${tr.transaction_date.getFullYear()}`);
    });

    const debitMonthCounts = debitMonths.reduce((acc, month) => {
        acc[month] = (acc[month] || 0) + 1;

        return acc;
    }, {});

    return Object.keys(debitMonthCounts).reduce((a, b) => debitMonthCounts[a] > debitMonthCounts[b] ? a : b);
}

/*
    Сравнение количества транзакций по типу
    trs - массив транзакций
*/
function mostTransactionTypes(trs) {
    if (!trs || trs.length === 0) {
        console.log("Нет транзакций для анализа");
        return;
    }
    const typeCnts = trs.reduce((acc, tr) => {
        acc[tr.transaction_type] = (acc[tr.transaction_type] || 0) + 1;

        return acc;
    })

    if (typeCnts["приход"] > typeCnts["расход"]) 
        console.log("Приходов больше, чем расходов");
    else if (typeCnts["приход"] < typeCnts["расход"])
        console.log("Расходов больше, чем приходов");
    else
        console.log("Приходов и расходов поровну");
}

/*
    Получение транзакций, совершенных до определенной даты
    transactions - массив транзакций
    date - дата для сравнения
*/
function getTransactionsBeforeDate(transactions, date) {
    if (!transactions || transactions.length === 0) {
        return [];
    }
    if (!date) throw new Error("Дата не указана");

    return transactions.filter(transaction => transaction.transaction_date < date);
}

/*
    Поиск транзакции по ID
    trs - массив транзакций
    id - ID транзакции для поиска
*/
findTransactionById = ((trs, id) => {
    if (!trs || trs.length === 0) {
        return null;
    }
    return trs.find(tr => tr.transaction_id === id);
});

/*
    Получение массива описаний транзакций
    trs - массив транзакций
*/
mapTransactionDescriptions = (trs => {
    if (!trs || trs.length === 0) {
        return [];
    }
    return trs.map(tr => tr.transaction_description);
});

// Проверка
console.log("getUniqueTransactionTypes:", getUniqueTransactionTypes(transactionsArr));
console.log("calculateTotalAmount:", calculateTotalAmount(transactionsArr));
console.log("calculateTotalAmountByDate (2024, 4, 1):", calculateTotalAmountByDate(transactionsArr, 2024, 4, 1));
console.log("getTransactionByType (приход):", getTransactionByType(transactionsArr, "приход"));
console.log("getTransactionsInDateRange (2024-04-01 to 2024-04-30):", getTransactionsInDateRange(transactionsArr, new Date(2024, 3, 1), new Date(2024, 3, 30)));
console.log("getTransactionsByMerchant (Online Store):", getTransactionsByMerchant(transactionsArr, "Online Store"));
console.log("calculateAverageTransactionAmount:", calculateAverageTransactionAmount(transactionsArr));
console.log("getTransactionsByAmountRange (50 to 200):", getTransactionsByAmountRange(transactionsArr, 50, 200));
console.log("calculateTotalDebitAmount:", calculateTotalDebitAmount(transactionsArr));
console.log("findMostTransactionsMonth:", findMostTransactionsMonth(transactionsArr));
console.log("findMostDebitTransactionMonth:", findMostDebitTransactionMonth(transactionsArr));
mostTransactionTypes(transactionsArr);
console.log("getTransactionsBeforeDate (2024-04-03):", getTransactionsBeforeDate(transactionsArr, new Date(2024, 3, 3)));
console.log("findTransactionById (1):", findTransactionById(transactionsArr, 1));
console.log("mapTransactionDescriptions:", mapTransactionDescriptions(transactionsArr));
const DISCOUNTS = [
    {
        id: '11',
        size: '29 30 31 32 33 34 35 36',
        description: 'Джинси Staff light blue slim-fit',
        img: 'img/products/jeans/jeans2.jpg',
        price: 1250
    },
    {
        id: '17',
        size: '29 30 31 32 33 34 35 36',
        description: 'Шорти...',
        img: 'img/products/shorts/shorts2.jpg',
        price: 500
    },
    {
        id: '24',
        size: 'S M L XL XLL XLLL',
        description: 'Кофта...',
        img: 'img/products/sweaters/sweater3.jpg',
        price: 1100
    }
]
DISCOUNTS.forEach(e => {
    const sumWithout = e.price / 100 * 25;
    const result = Math.round(e.price - sumWithout);
    e.price = result;
})


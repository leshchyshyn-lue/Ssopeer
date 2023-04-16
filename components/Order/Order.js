
class Order {

    handleOrder(size, id, description, price) {

        const sizes = size.split(" ");

        let sizeOption = '<select>';
        Object.values(sizes).forEach(element => {
            sizeOption += `
                <option>${element}</option>
            `;
        });

        let countryOption = '<select>';
        COUNTRIES.forEach((element) => {
            countryOption += `
                <option>${element}</option>
            `;
        })
        let html = `
            <div class="order window">
                <div class="order__confirm">
                    <div class="window__desc">
                        <div class="window__title">Оформлення замовлення</div>
                        <button onclick="scrollController.handleClear(ROOT_ORDER)">
                            <img src="img/close.png">
                        </button>
                    </div>
                    <ul class="order__data">
                        <li >${description}</li>
                        <li>Ціна: ${price} грн.</li>
                        <li>
                            <span>Виберіть розмір: </span>
                                ${sizeOption};
                            </select>
                        </li>
                    </ul>
                    <div class="order__contacts"> 
                        <div class="order__title">Контактні дані</div>
                        <form>
                            <div class="order__form-row">
                                <div class="data">
                                    <label id="name">Ім'я *</label>
                                    <input type="text" placeholder="Введіть ваше ім'я">
                                    <label id="lastname">Прізвище *</label>
                                    <input type="text" placeholder="Введіть ваше прізвище">
                                </div>
                                <div class="data">
                                    <label id="phonenumber">Номер телефону *</label>
                                    <input type="number" placeholder="+38">
                                    <label id="email">Електронна пошта *</label>
                                    <input type="email" placeholder="Введіть ваш email">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="order__delivery">
                        <div class="order__title">Доставка</div>
                        <form>
                            <div class="order__form-row">
                                <div class="order__select-country">
                                        ${countryOption}
                                    </select>
                                </div>
                                <div class="data">                                
                                    <label id="town">Місто *</label>
                                    <input class ="window__field" type="text" placeholder="Введіть ваше місто">
                                </div>
                            </div>
                            <div class="order__comment data">
                                <label id="town">Коментар до замовлення *</label>
                                <input class="window__field" type="text">
                            </div>
                            <div class="order__confirm-button">
                                <button type="submit">Підтвердити замовлення</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            `;
        ROOT_ORDER.innerHTML = html;
    }
}

const orderPage = new Order();


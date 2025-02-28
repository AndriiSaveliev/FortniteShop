function GoodsItem(props) {
    const {
        mainId,
        displayName,
        displayDescription = "No description available",
        price = {},
        displayType,
        displayAssets = [],
        addToBasket = Function.prototype,
    } = props;

    if (displayType !== "Item Bundle") {
        return null; // Если не "Item Bundle", не рендерим этот элемент
    }

    // Проверяем, есть ли изображение
    if (!displayAssets.length || !displayAssets[0].full_background) {
        return null; // Если нет картинки, не рендерим объект
    }

    return (
        <div className="card">
            <div className="card-image">
                <img src={displayAssets[0].full_background} alt="Product Image"/>
            </div>
            <div className="card-content">
                <span className="card-title">{displayName}</span>
                <p>{displayDescription}</p>
            </div>
            <div className="card-action">
                <button className='btn' onClick={() => addToBasket({
                    mainId,
                    displayName,
                    price,
                })}>Buy</button>
                <span className='right' style={{fontSize:'1.8rem'}}>${price.finalPrice || "0.00"}</span>
            </div>
        </div>
    );
}

export { GoodsItem };

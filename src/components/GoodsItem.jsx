function GoodsItem(props) {
    const {
        mainId,
        displayName,
        displayDescription = "No description available",
        price = {},
        displayType,
        displayAssets = []
} = props;
    if (displayType !== "Item Bundle") {
        return null; // Если не "Item Bundle", не рендерим этот элемент
    }
    return (<div className="card" id={mainId}>
        <div className="card-image">
            <img src={displayAssets[0].full_background} alt="Product Image"/>
        </div>
        <div className="card-content">
            <span className="card-title">{displayName}</span>
            <p>{displayDescription}</p>
        </div>
        <div className="card-action">
        <button className='btn'>Buy</button>
            <span className='right' style={{fontSize:'1.8rem'}}>${price.finalPrice}</span>
        </div>
    </div>);
}

export {GoodsItem}
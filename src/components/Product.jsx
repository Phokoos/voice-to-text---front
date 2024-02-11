import PropTypes from "prop-types";

const Product = ({
                     imgUrl = "<https://dummyimage.com/640x480/2a2a2a/ffffff&text=Product+image+placeholder>",
                     name,
                     price,
                 }) => (
    <div>
        <img src={imgUrl} alt={name} width="640" />
        <h2>{name}</h2>
        <p>Price: {price}$</p>
        <button type="button">Add to cart</button>
    </div>
);

Product.propTypes = {
    imgUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default Product;
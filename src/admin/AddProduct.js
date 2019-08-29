import React, {useState, useEffect} from 'react'
import {isAuthenticated} from '../auth'
import {createProduct, getCategories} from './apiAdmin'
import {Link} from 'react-router-dom'



const AddProduct = () => {
    const {user, token} = isAuthenticated()
    const [values, setValues] = useState({
        SGname: '',
        vendorName: '',
        seriesName: '',
        description: '',
        color: '',
        colorVariation: '',
        application: '',
        finishes: '',
        stockSizes: '',
        origin: '',
        residentialUse: false,
        commercialUse: false,
        outdoorUse: false,
        categories: [],
        category: '',
        style: '',
        sold: '',
        sqFootPerBox: '',
        SGPricePerPiece: '',
        SGPricePerSF: '',
        SGPricePerBox: '',
        RetailPricePerPiece: '',
        RetailPricePerSF: '',
        RetailPricePerBox: '',
        weight: '',
        Quantity: '',
        Special: false, 
        length: '',
        width: '',
        thickness: '',
        SGItemCode: '',
        VendorItemCode: '',
        picture: '',
        loading: false,
        soldPerBox: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })
    const { SGname,
            vendorsName,
            vendor,
            seriesName,
            description,
            color,
            colorVariation,
            application,
            finishes,
            minimumOrder,
            textureVariation,
            stockSizes,
            origin,
            residentialUse,
            commercialUse,
            outdoorUse,
            categories,
            category,
            style,
            sold,
            sqFootPerBox,
            SGPricePerPiece,
            SGPricePerSF,
            SGPricePerBox,
            VendorCostPerPiece,
            VendorCostPerSF,
            VendorCostPerBox,
            weight,
            length,
            width,
            Quantity,
            Special,
            thickness,
            SGItemCode,
            VendorItemCode,
            picture,
            loading,
            soldPerBox,
            error,
            createdProduct,
            redirectToProfile,
            formData } = values

            const init = () => {
                getCategories().then(data => {
                    if(data.error) {
                        setValues({...values, 
                                    error: data.error
                                })
                    } else {
                        setValues({...values, 
                                    categories: data, 
                                    formData: new FormData()
                                })
                    }
                })
            }

            const handleChange = name => event => {
                const value = name === 'picture' ? event.target.files[0] : event.target.value
                formData.set(name, value)
                setValues({...values, [name]: value})
            }

            const handleSubmit = event => {
                event.preventDefault()
                setValues({...values, error: '', loading: true})
                createProduct(user._id, token, formData)
                .then(data => {
                    if(data.error) {
                        setValues({...values, error: data.error})
                    } else {
                        setValues({
                            ...values, 
                            SGname: '',
                            vendorsName: '',
                            vendor:'',
                            seriesName: '',
                            description: '',
                            color: '',
                            colorVariation: '',
                            textureVariation: '',
                            minimumOrder: '',
                            application: '',
                            finishes: '',
                            stockSizes: '',
                            origin: '',
                            style: '',
                            sqFootPerBox: '',
                            SGPricePerPiece: '',
                            SGPricePerSF: '',
                            SGPricePerBox: '',
                            VendorCostPerPiece: '',
                            VendorCostPerSF: '',
                            VendorCostPerBox: '',
                            weight: '',
                            width: '',
                            length: '',
                            thickness: '',
                            SGItemCode: '',
                            VendorItemCode: '',
                            loading: false,
                            redirectToProfile: true,
                            createdProduct: data.SGname
                        })
                    }
                })
            }

            const newPostForm = () => (
                <form   className="mb-3 mt-4" 
                        onSubmit={handleSubmit}>

                    {/* Picture */}
                    <div className="choose-file mb-4">
                        <h4>Product Picture</h4>
                        <p className="text-muted">Give the product you are creating an image. The image must be <strong>600 x 600 px</strong> </p>
                        <label>
                            <input  type="file"
                                    onChange={handleChange('picture')}
                                    name="picture"
                                    accept="image/*"/>
                        </label>
                    </div>

                    {/* SG Name */}
                    <div className="form-group">
                        <h4>OUR Product Name</h4>
                        <label className="text-muted">This is the "Surface Group" name we are giving to the product.<em className="text-primary">This is displayed on the front end for the customers to see.</em> (ex: Saddle, Arabescato, etc.)</label>
                        <input  onChange={handleChange('SGname')} 
                                type="text" 
                                className="form-control" 
                                value={SGname}/>
                    </div>

                    {/* Vendor Name */}
                    <div className="form-group">
                        <h4>Vendor Product Name</h4>
                        <label className="text-muted">This is the name of the product that the vendor has given. <em className="text-danger">This is NOT displayed on the front end for the customers to see.</em> (ex: Sea Fog, Buckthorn, etc.)</label>
                        <input  onChange={handleChange('vendorsName')} 
                                type="text" 
                                className="form-control" 
                                value={vendorsName}/>
                    </div>

                    {/* Vendor */}
                    <div className="form-group">
                        <h4>The Vendor</h4>
                        <label className="text-muted">This is the vendor who is supplying the material. <em className="text-danger">This is NOT displayed on the front end for the customers to see.</em> (ex: Teka, Hausmann, etc.)</label>
                        <input  onChange={handleChange('vendor')} 
                                type="text" 
                                className="form-control" 
                                value={vendor}/>
                    </div>

                    {/* Category */}
                    <div className="form-group">
                        <h4>Category</h4>
                        <label className="text-muted">You <em>must</em> assign the product you are creating a category. <em className="text-primary">This is displayed on the front end for the customers to see.</em></label>
                        <select
                            onChange={handleChange("category")}
                            className="form-control">
                                <option>Select Category</option>
                                {categories && 
                                    categories.map((c, i) => (
                                    <option key={i} 
                                            value={c._id}>
                                        {c.name}
                                    </option>))}
                        </select>
                    </div>

                    {/* Series Name */}
                    <div className="form-group">
                        <h4>Series Name</h4>
                        <label className="text-muted">If the product is part of a specific series or collection (ex: Teka has the Antique, Landscape, Royal, Colonial, Studio...etc.), enter it here.  <em className="text-danger">This is NOT displayed on the front end for the customer to see.</em> </label>
                        <input onChange={handleChange('seriesName')} type="text" className="form-control" value={seriesName}/>
                    </div>

                    {/* Color */}
                    <div className="form-group">
                        <h4>Color</h4>
                        <label className="text-muted">A word or two regarding the products color. (ex: White, <em>OR</em> White, Brown... can even be a sentence regarding color).  <em className="text-primary">This is displayed on the front end for the customers to see.</em> </label>
                        <input onChange={handleChange('color')} 
                                type="text" 
                                className="form-control" 
                                value={color}/>
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <h4>Description</h4>
                        <label className="text-muted">This block of text will populate the description dropdown menu located right above the reviews tab. (ex: Arabescato Marble is a white background with grey waves marble quarried in Italy. This stone is especially good for Countertops, monuments....etc). <em className="text-primary">This is displayed on the front end for the customers to see.</em></label>
                        <textarea   onChange={handleChange('description')} 
                                    className="form-control" 
                                    value={description}/>
                    </div>

                    {/* Color Variation */}
                    <div className="form-group">
                        <h4>Color Variation</h4>
                        <label className="text-muted">If a product has an irregular color pattern, it will have a color variation attribute that can range from V1 (almost uniform) to V4 (high degree of variation). Please input this field as V1, V2, V3 or V4. <em className="text-primary">This is displayed on the front end for the customers to see.</em></label>
                        <input  onChange={handleChange('colorVariation')} 
                                type="text" 
                                className="form-control" 
                                value={colorVariation}/>
                    </div>

                    {/* Texture Variation */}
                    <div className="form-group">
                        <h4>Texture Variation</h4>
                        <label className="text-muted">If a product has an irregular texture, it will have a texture variation attribute that can range from T1 (almost uniform) to T4 (high degree of variation). Please input this field as T1, T2, T3 or T4. <em className="text-primary">This is displayed on the front end for the customers to see.</em></label>
                        <input  onChange={handleChange('textureVariation')} 
                                type="text" 
                                className="form-control" 
                                value={textureVariation}/>
                    </div>

                    {/* Minimum order */}
                    <div className="form-group">
                        <h4>Minimum Order</h4>
                        <label className="text-muted">This attribute describes the minimum quantity required to order this product. (ex: 2). <em className="text-warning">This is NOT displayed on the front end for the customers to see as of right now, but can be added if needed.</em></label>
                        <input onChange={handleChange('minimumOrder')} 
                                type="number" 
                                className="form-control" 
                                value={minimumOrder}/>
                    </div>

                    {/* Application */}
                    <div className="form-group">
                        <h4>Application</h4>
                        <label className="text-muted">This describes what surface this product is meant to be applied to. (ex: Floors, Walls, Ceilings..etc). <em className="text-warning">This is NOT displayed on the front end for the customers to see as of right now, but can be added if needed.</em></label>
                        <input  onChange={handleChange('application')} 
                                type="text" 
                                className="form-control" 
                                value={application}/>
                    </div>

                    {/* Finishes */}
                    <div className="form-group">
                        <h4>Finish</h4>
                        <label className="text-muted">This describes the "finish" of the product. (ex: Antique, Brushed, Bush Hammered, Chiseled, Cleft, Etched, Filled, Honed, Hand Made, Polished, Tumbled, Unfilled). <em className="text-warning">This is NOT displayed on the front end for the customers to see as of right now, but can be added if needed.</em></label>
                        <input  onChange={handleChange('finishes')} 
                                type="text" 
                                className="form-control" 
                                value={finishes}/>
                    </div>

                    {/* Stock Sizes */}
                    <div className="form-group">
                        <h4>Stock Sizes</h4>
                        <label className="text-muted">These are the available 'stock' sizes for the particular product. Please format the stock sizes exactly like this: (ex: 18"x18"). <em className="text-warning">This is NOT displayed on the front end for the customers to see as of right now, but can be added if needed.</em></label>
                        <input  onChange={handleChange('stockSizes')} 
                                type="text" 
                                className="form-control" 
                                value={stockSizes}/>
                    </div>

                    {/* Origin */}
                    <div className="form-group">
                        <h4>Country Of Origin</h4>
                        <label className="text-muted">This is the country where the product is from. (ex: Italy, India, Russia..etc). <em className="text-warning">This is NOT displayed on the front end for the customers to see as of right now, but can be added if needed.</em></label>
                        <input onChange={handleChange('origin')} 
                                type="text" 
                                className="form-control" 
                                value={origin}/>
                    </div>

                    {/* Residential Use */}
                    <div className="form-group">
                        <h4>Residential Use</h4>
                        <label className="text-muted">Is this product suitable for use in a home type residence? <em className="text-warning">This is NOT displayed on the front end for the customers to see as of right now, but can be added if needed.</em></label>
                        <select
                            onChange={handleChange("residentialUse")}
                            className="form-control"
                            >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                        </select>
                    </div>

                    {/* Commercial Use */}
                    <div className="form-group">
                        <h4>Commerical Use</h4>
                        <label className="text-muted">Is this product suitable for use in a business type establishment? <em className="text-warning">This is NOT displayed on the front end for the customers to see as of right now, but can be added if needed.</em></label>
                        <select
                            onChange={handleChange("commercialUse")}
                            className="form-control">
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                        </select>
                    </div>

                    {/* Outdoor Use */}
                    <div className="form-group">
                        <h4>Outdoor Use</h4>
                        <label className="text-muted">Is this product suitable for the outdoors? <em className="text-warning">This is NOT displayed on the front end for the customers to see as of right now, but can be added if needed.</em></label>
                        <select
                            onChange={handleChange("outdoorUse")}
                            className="form-control">
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                        </select>
                    </div>

                    {/* Special */}
                    <div className="form-group">
                        <h4>Special</h4>
                        <label className="text-muted">This is a way to diffentiate two different types of products..unsure how we are using this just yet. <em className="text-danger">This is NOT displayed on the front end for the customers to see.</em></label>
                        <select
                            onChange={handleChange("Special")}
                            className="form-control">
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                        </select>
                    </div>

                    {/* Style */}
                    <div className="form-group">
                        <h4>Style</h4>
                        <label  className="text-muted">This attribute is more specific towards hardwood. Tekas website has an example regarding the style (ex: Brushed, Smooth and 4 sided beveled. No handscrape, no distressing.) <em className="text-warning">This is NOT displayed on the front end for the customers to see as of right now, but can be added if needed.</em></label>
                        <input  onChange={handleChange('style')} 
                                type="text" 
                                className="form-control" 
                                value={style}/>
                    </div>
                    
                    {/* Quantity */}
                    <div className="form-group">
                        <h4>Quantity</h4>
                    <label  className="text-muted">Regardless if the product is limited quantity, all products will have a quantity of some sort. The ones that we are going to have to order from vendors will typically have a very high quantity (10000 +), and the inventory stock will have a more accurate quantity. The number will automatically decrease everytime a product is sold. If the quantity reaches 0, the ability to purchase the product dissapears, and the 'out of stock' icon will appear on the products detail page. <em className="text-danger">The quantity is not displayed on the front end for the customers to see, just the "in stock" or "out of stock" info based on the value.</em></label>
                        <input  onChange={handleChange('Quantity')} 
                                type="number" 
                                className="form-control" 
                                value={Quantity}/>
                    </div>

                    {/* sqFootPerBox */}
                    <div className="form-group">
                        <h4>Square Foot Per Box</h4>
                        <label  className="text-muted">This is the square foot covered by a single box of this material. <em className="text-primary">This is displayed on the front end for the customers to see.</em></label>
                        <input  onChange={handleChange('sqFootPerBox')} 
                                type="number" 
                                className="form-control" 
                                value={sqFootPerBox}/>
                    </div>

                    {/* SGPricePerPiece */}
                    <div className="form-group">
                        <h4>OUR price per piece</h4>
                        <label className="text-muted">This is the price that we are setting per piece. <em className="text-primary">This is displayed on the front end for the customers to see.</em></label>
                        <input onChange={handleChange('SGPricePerPiece')} 
                                type="number" 
                                className="form-control" 
                                value={SGPricePerPiece}/>
                    </div>

                    {/* SGPricePerSF */}
                    <div className="form-group">
                        <h4>OUR price per Square Foot</h4>
                        <label className="text-muted">This is the price we are setting per square foot. <em className="text-primary">This is displayed on the front end for the customers to see.</em></label>
                        <input onChange={handleChange('SGPricePerSF')} 
                                type="number" 
                                className="form-control" 
                                value={SGPricePerSF}/>
                    </div>

                    {/* SGPricePerBox */}
                    <div className="form-group">
                        <h4>OUR price per box</h4>
                        <label className="text-muted">This is the price that we are setting per box. <em className="text-primary">This is displayed on the front end for the customers to see.</em></label>
                        <input onChange={handleChange('SGPricePerBox')} 
                                type="number" 
                                className="form-control" 
                                value={SGPricePerBox}/>
                    </div>

                    {/* RetailPricePerPiece */}
                    <div className="form-group">
                        <h4>RETAIL Price Per Piece</h4>
                        <label className="text-muted">This is the cost <strong>per piece</strong> at which we are attaining this product. <em className="text-danger">This is NOT displayed on the front end for the customers to see.</em></label>
                        <input onChange={handleChange('VendorCostPerPiece')} 
                                type="number" 
                                className="form-control" 
                                value={VendorCostPerPiece}/>
                    </div>
                    
                    {/* RetailPricePerSF */}
                    <div className="form-group">
                        <h4>RETAIL Price Per Square Foot</h4>
                        <label  className="text-muted">This is the cost <strong>per square foot</strong> at which we are attaining this product. <em className="text-danger">This is NOT displayed on the front end for the customers to see.</em></label>
                        <input  onChange={handleChange('VendorCostPerSF')} 
                                type="number" 
                                className="form-control" 
                                value={VendorCostPerSF}/>
                    </div>

                    {/* RetailPricePerBox */}
                    <div className="form-group">
                        <h4>RETAIL Price Per Box</h4>
                        <label  className="text-muted">This is the cost <strong>per box</strong> at which we are attaining this product. <em className="text-danger">This is NOT displayed on the front end for the customers to see.</em></label>
                        <input  onChange={handleChange('VendorCostPerBox')} 
                                type="number" 
                                className="form-control" 
                                value={VendorCostPerBox}/>
                    </div>

                    {/* weight */}
                    <div className="form-group">
                        <h4>Weight</h4>
                        <label  className="text-muted">This is the weight of the product in lbs. Simply input just the number (ex: 56). <em className="text-danger">This is NOT displayed on the front end for the customers to see, mainly for shipping purposes.</em></label>
                        <input  onChange={handleChange('weight')} 
                                type="number" 
                                className="form-control" 
                                value={weight}/>
                    </div>

                    {/* length */}
                    <div className="form-group">
                        <h4>Length</h4>
                        <label  className="text-muted">This is the length in inches. Simply input just the number (ex: 18). <em className="text-primary">This is displayed on the front end for the customers to see.</em></label>
                        <input  onChange={handleChange('length')} 
                                type="number" 
                                className="form-control" 
                                value={length}/>
                    </div>

                    {/* width */}
                    <div className="form-group">
                        <h4>Width</h4>
                        <label  className="text-muted">This is the width in inches. Simply input just the number (ex: 18). <em className="text-primary">This is displayed on the front end for the customers to see.</em></label>
                        <input  onChange={handleChange('width')} 
                                type="number" 
                                className="form-control" 
                                value={width}/>
                    </div>

                    {/* thickness */}
                    <div className="form-group">
                        <h4>Thickness</h4>
                        <label  className="text-muted">This is the thickness of the slab of material. This is measured and described in inches. Simply input only a fraction (ex: 3/4). <em className="text-primary">This is displayed on the front end for the customers to see.</em></label>
                        <input  onChange={handleChange('thickness')} 
                                type="text" 
                                className="form-control" 
                                value={thickness}/>
                    </div>

                    {/* SGItemCode */}
                    <div className="form-group">
                        <h4>Surface Group Item Code</h4>
                        <label  className="text-muted">This is a unique 'item code' that Surface Group is assigning to the product (ex: MT-001-POL-18x18).  <em className="text-danger">This is NOT displayed on the front end for the customers to see.</em></label>
                        <input  onChange={handleChange('SGItemCode')} 
                                type="text" 
                                className="form-control" 
                                value={SGItemCode}/>
                    </div>

                    {/* VendorItemCode */}
                    <div className="form-group">
                        <h4>Vendor Item Code</h4>
                        <label className="text-muted">This is the 'item code' that the Vendor has assigned to the product (ex: TBD)..  <em className="text-danger">This is NOT displayed on the front end for the customers to see.</em></label>
                        <input onChange={handleChange('VendorItemCode')} 
                                type="text" 
                                className="form-control" 
                                value={VendorItemCode}/>
                    </div>

                    {/* Sold Per Box? */}
                    <div className="form-group">
                        <h4>Sold Per Box</h4>
                        <label className="text-muted">This determines if the product is sold by the box or per piece. <em className="text-danger">This is NOT displayed on the front end for the customers to see.</em></label>
                        <select
                            onChange={handleChange("soldPerBox")}
                            className="form-control">
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                        </select>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="text-center">
                        <button className="btn btn-primary">Create Product</button>
                    </div>
                </form>
            )

            const showError = () => (
                <div    className="alert alert-danger" 
                        style={{display: error ? '' : 'none'}}>
                    {error}
                </div>
            )

            const showSuccess = () => (
                <div    className="alert alert-info" 
                        style={{display: createdProduct ? '' : 'none'}}>
                    <h2>{`${createdProduct}`} is created!</h2>
                </div>
            )

            const showLoading = () => (
                loading && <div className="alert alert-success">
                    <h2>Loading...</h2>
                </div>
            )

            useEffect(() => {
                init()
            }, [])

    return (
        <div className="container-fluid">
            <div className="dash-top">
            <i className="fas fa-users-cog"></i>
            <h2 className="ml-4"><em>Create A Product</em></h2>
            </div>
                <div className="col-md-8 offset-md-2">
                    <h2 className="mt-4 mb-4 text-center">Build A New Product!</h2>
                    <div className="text-center">You dont need to fill all the fields out, but I still need to write some logic to cause the entries to not appear at all if left blank.</div>
                        {showLoading()}
                        {showSuccess()}
                        {showError()}
                        {newPostForm()}
                </div>
        </div>
    )
}

export default AddProduct

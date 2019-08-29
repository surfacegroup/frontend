import React from 'react'

class Contact extends React.Component {
    
    render() {
        return (
            <div className="contact-page">
                <div className="contact-container1"/>
                <div className="contact-container2">
                    <span style={{fontSize: '25px'}}>
                        <em>Reach Out To Our Experts</em>
                    </span>
                    <span>
                        <em>Surface Group is always willing to help. For all questions regarding orders, please send to orders@surfacegroup.com</em>
                    </span>
                </div>
                <div className="contact-container3">
                    <div className="contact-container3-col">
                        <i className="fas fa-phone"></i>
                        <span style={{fontSize: '20px'}}>Phone</span>
                        <div><em>(847) 713-2373</em></div>
                    </div>
                    <div className="contact-container3-col">
                        <i className="fas fa-building"></i>
                        <span style={{fontSize: '20px'}}>Showroom</span>
                        <div  style={{fontSize: '10px'}}><em>201 Lageschulte Street Barrington, IL 60010</em></div>
                    </div>
                    <div className="contact-container3-col">
                        <i className="fas fa-envelope"></i>
                        <span style={{fontSize: '20px'}}>Email</span>
                        <div><em>surfacegroupint@gmail.com</em></div>
                    </div>
                    <div className="contact-container3-col">
                        <i className="fas fa-fax"></i>
                        <span style={{fontSize: '20px'}}>Fax</span>
                        <div><em>(847) 713-2370</em></div>
                    </div>
                </div>
                <div className="contact-container4">
                    <span style={{fontSize: '20px'}}>Hours: M-F – 8:00am – 4:30pm</span>
                    <span>Saturday by appointment only</span>
                </div>
                {/* <div className="contact-container5">
                    <h2><em>Send Us A Message</em></h2>
                    <form className="form-container-outer">
                        <div className="form-container-inner">
                        <div className="form-container-col" id="fcc-1" style={{marginRight: '15px', marginLeft: '30px'}}>
                            <input placeholder="First Name" type="text"/>
                            <input placeholder="Email Address" type="text"/>
                            <select name="state">
                            <option value="" selected disabled hidden>State</option>
                                <option value="alabama">Alabama</option>
                                <option value="alaska">Alaska</option>
                                <option value="arizona">Arizona</option>
                                <option value="arkansas">Arkansas</option>
                                <option value="california">California</option>
                                <option value="colorado">Colorado</option>
                                <option value="delaware">Delaware</option>
                                <option value="district of columbia">District of Columbia</option>
                                <option value="florida">Florida</option>
                                <option value="georgia">Georgia</option>
                                <option value="hawaii">Hawaii</option>
                                <option value="idaho">Idaho</option>
                                <option value="illinois">Illinois</option>
                                <option value="indiana">Indiana</option>
                                <option value="iowa">Iowa</option>
                                <option value="kansas">Kansas</option>
                                <option value="kentucky">Kentucky</option>
                                <option value="louisiana">Louisiana</option>
                                <option value="maine">Maine</option>
                                <option value="maryland">Maryland</option>
                                <option value="massachusetts">Massachusetts</option>
                                <option value="michigan">Michigan</option>
                                <option value="minnesota">Minnesota</option>
                                <option value="mississippi">Mississippi</option>
                                <option value="missouri">Missouri</option>
                                <option value="montana">Montana</option>
                                <option value="nebraska">Nebraska</option>
                                <option value="nevada">Nevada</option>
                                <option value="new-hampshire">New Hampshire</option>
                                <option value="new-jersey">New Jersey</option>
                                <option value="new-mexico">New Mexico</option>
                                <option value="new-york">New York</option>
                                <option value="north-carolina">North Carolina</option>
                                <option value="north-dakota">North Dakota</option>
                                <option value="ohio">Ohio</option>
                                <option value="oregon">Oregon</option>
                                <option value="pennsylvania">Pennsylvania</option>
                                <option value="rhode-island">Rhode Island</option>
                                <option value="south-carolina">South Carolina</option>
                                <option value="south-dakota">South Dakota</option>
                                <option value="tennessee">Tennessee</option>
                                <option value="texas">Texas</option>
                                <option value="utah">Utah</option>
                                <option value="vermont">Vermont</option>
                                <option value="virginia">Virginia</option>
                                <option value="washington">Washington</option>
                                <option value="west-virginia">West Virginia</option>
                                <option value="wisconsin">Wisconsin</option>
                                <option value="wyoming">Wyoming</option>
                            </select>
                        </div>
                        <div className="form-container-col" id="fcc-2"  style={{marginLeft: '15px',  marginRight: '30px'}}>
                            <input placeholder="Last Name" type="text"/>
                            <input placeholder="Phone" type="text"/>
                            <select name="customer-type">
                            <option value="" selected disabled hidden>Customer Type</option>
                                <option value="homeowner">Homeowner</option>
                                <option value="designer">Designer</option>
                                <option value="architech">Architect</option>
                                <option value="contractor">Contractor</option>
                                <option value="commercial">Commercial</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        </div>
                        <div className="form-container-question">
                            <textarea placeholder="Question" style={{width: '100%'}} type="text"/>
                        </div>

                        <div>
                            <button className="btn btn-primary mb-4">Submit</button>
                        </div>

                        
                        
                    </form>
                </div> */}
            </div>
        )       
    } 
}

export default Contact
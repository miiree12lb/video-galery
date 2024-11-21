import React, { useState } from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import './css/navbar.css';
//@ts-ignore
import logo from "./assets/images/logo.png";

function Nabvar({ categories, selectedCategory, setSelectedCategory, setSearchQuery }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const toggleIcon = () => {
        setIsOpen(!isOpen);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div className="nav-bar">
            <div className="nav-bar-left">
                <div className="chip">
                    <Link to="https://miiree12lb.site/">
                        <img src={logo} alt="logo" width="50" height="50" />
                    </Link>
                    Video Gallery
                </div>

                <div className="dropdown">
                    <button id="category" onClick={toggleIcon}>
                        Category: {selectedCategory}
                        <i
                            id="caret"
                            className={`fa ${isOpen ? "fa-caret-up" : "fa-caret-down"}`}
                        />
                    </button>

                    {isOpen && (
                        <div className="dropdown-content">
                            <div className="radio-buttons">
                                {categories.map((category, index) => (
                                    <label key={index} className="custom-radio">
                                        <input
                                            type="radio"
                                            name="category"
                                            value={category}
                                            checked={selectedCategory === category}
                                            onChange={handleCategoryChange}
                                        />
                                        <span>{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="nav-bar-right">
                <input
                    type="text"
                    placeholder="Search by (sub)title..."
                    onChange={handleSearch}
                />

                <button className="search-button">
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </div>
    );
}

export default Nabvar;


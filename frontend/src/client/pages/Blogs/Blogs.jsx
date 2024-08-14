import React from "react";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroBlog from '../Blogs/HeroBlog';
import BlogGrid from './BlogGrid';

const Blogs = () => {
    return (
        <div className="blogs">
            <Header />
            <HeroBlog />
            <BlogGrid />
            <Footer />
        </div>
    );
};

export default Blogs;
import React from 'react';
import CategoryN from '../components/category/categoryN';
import { Route, Routes } from 'react-router-dom';

function Categoryacc() {
    return <div>Categoryacc</div>;
}

function Categorybest() {
    return <div>categorybest</div>;
}

function Categoryladies() {
    return <div>Categoryladies</div>;
}

function Categorymens() {
    return <div>categorymens</div>;
}

function CategoryNew() {
    return (
        <>
            <CategoryN />
        </>
    );
}

function Categorysale() {
    return <div>categorysale</div>;
}

export default function Category() {
    return (
        <>
            <Routes>
                <Route path='/acc' element={<Categoryacc />} />
                <Route path='/best' element={<Categorybest />} />
                <Route path='/sale' element={<Categorysale />} />
                <Route path='/ladies' element={<Categoryladies />} />
                <Route path='/mens' element={<Categorymens />} />
                <Route path='/new' element={<CategoryNew />} />
            </Routes>
        </>
    );
}

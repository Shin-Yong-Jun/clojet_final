import React from 'react'
import './product.scss'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";

function Product() {
    const [products, setProducts] = useState([]);

    useEffect(()=> {
        fetchProdcuts();
    }, [])

    const fetchProdcuts = async() => {
        try{
            const response = await axios('/product/list');
            const data = await response.json();
            setProducts(data);
        } catch(error) {
            console.error("fetchProducts 함수 에러", error);
        }
    };

    const columns = [
        { field: 'productSeq', headerName: 'ID', width: 70 },
        { field: 'productThumUrl', headerName: '썸네일', width: 70 },
        { field: 'productName', headerName: '상품명', width: 70 },
        { field: 'genderCode', headerName: '성별', width: 70 },
        { field: 'productPrice', headerName: '가격', width: 70 },
        { field: 'ccType', headerName: '컬러', width: 70 },
        { field: 'csType', headerName: '사이즈', width: 70 },
        { field: 'productStock', headerName: '재고량', width: 70 },
        { field: 'ctGrp', headerName: '상품분류', width: 70 },
        { field: 'cmGrp', headerName: '옷분류', width: 70 },
        { field: 'cbType', headerName: '상세옷분류', width: 70 },
        { field: 'productEnroll', headerName: '상품등록일', width: 70 },
        { field: 'productDetail', headerName: '상품상세', width: 70 },
    ]



    const actionColumn = [
        {
            field: 'action',
            headerName: '관리',
            width: 200,
            renderCell: () => {
                return (
                    <div className='cellAction'>
                        <div className='button view'>
                            <Link to={'./productsingle'}>View</Link>
                        </div>
                        <div className='button Delete'>Delete</div>
                    </div>
                );
            },
        },
    ]

  return (

    <div className='productListBox'>
        <div className='productInput'>
            
        </div>
        <DataGrid
            rows={products}
            columns={columns.concat(actionColumn)}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 20,
                    },
                },
            }}
            pageSizeOptions={[20]}
            checkboxSelection
            disableRowSelectionOnClick
            localeText={{
                // Rows selected footer text
                footerRowSelected: (count) => `${count.toLocaleString()} 개 선택됨`,
            }}
        
        />

    </div>
  )
}

export default Product
import React from 'react'
import './product.scss'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

function Product() {
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
        <DataGrid
            rows={}
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
import './product.scss';
import { Link } from 'react-router-dom';
import { userDb } from '../../../userDb';
import { DataGrid } from '@mui/x-data-grid';
// https://github.com/mui/mui-x/blob/HEAD/packages/grid/x-data-grid/src/constants/localeTextConstants.ts

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'userName',
        headerName: '이름',
        width: 230,

        renderCell: (params) => {
            return (
                <div className='cellWithImg'>
                    <img
                        className='cellImg'
                        src={params.row.img}
                        alt='avatar'
                    />
                    {params.row.userName}
                </div>
            );
        },
    },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'age', headerName: '나이', width: 100 },
    {
        field: 'status',
        headerName: '상태',
        width: 160,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.status}`}>
                    {params.row.status}
                </div>
            );
        },
    },
];

const Product = () => {
    const actionColumn = [
        {
            field: 'action',
            headerName: '관리',
            width: 200,
            renderCell: () => {
                return (
                    <div className='cellAction'>
                        <div className='button view'>
                            <Link to={'./single'}>View</Link>
                        </div>
                        <div className='button Delete'>Delete</div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className='datatable'>
            <Link to={'*/new'}>새상품등록</Link>
            <DataGrid
                rows={userDb}
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
                    footerRowSelected: (count) =>
                        `${count.toLocaleString()} 개 선택됨`,
                }}
            />
        </div>
    );
};

export default Product;

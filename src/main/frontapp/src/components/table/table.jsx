import './table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TableList = () => {
    const statusKor = {
        Approved: '결제완료',
        Pending: '결제대기',
    };

    const rows = [
        {
            id: 123424123,
            product: 'item',
            img: 'https://search.pstatic.net/common?type=f&size=298x140&quality=95&direct=true&ttype=input&src=https%3A%2F%2Fimgauto-phinf.pstatic.net%2F20220824_246%2Fauto_1661315255798SRDn9_PNG%2F20220824132725_J9S3nuep.png',
            customer: 'inku',
            date: '1 March',
            amount: 758,
            method: '카드결제',
            status: 'Approved',
        },
        {
            id: 123444123,
            product: 'item',
            img: 'https://search.pstatic.net/common?type=f&size=298x140&quality=95&direct=true&ttype=input&src=https%3A%2F%2Fimgauto-phinf.pstatic.net%2F20190730_287%2Fauto_1564469668966PYYpe_PNG%2F20190730155414_7zNf0ryR.png',
            customer: 'inku',
            date: '1 March',
            amount: 758,
            method: '카드결제',
            status: 'Approved',
        },
        {
            id: 123414123,
            product: 'item',
            img: 'https://search.pstatic.net/common?type=f&size=298x140&quality=95&direct=true&ttype=input&src=https%3A%2F%2Fimgauto-phinf.pstatic.net%2F20200811_151%2Fauto_1597105742975X0avX_PNG%2F20200811092853_1n6q1uEu.png',
            customer: 'inku',
            date: '1 March',
            amount: 758,
            method: '카드결제',
            status: 'Pending',
        },
    ];

    return (
        <div className='listContainer'>
            <div className='listTitle'>최근 판매 리스트</div>
            <TableContainer component={Paper} className='table'>
                <Table aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell className='tableCell'>상품코드</TableCell>
                            <TableCell className='tableCell'>상품명</TableCell>
                            <TableCell className='tableCell'>고객명</TableCell>
                            <TableCell className='tableCell'>구매일자</TableCell>
                            <TableCell className='tableCell'>수량</TableCell>
                            <TableCell className='tableCell'>결제수단</TableCell>
                            <TableCell className='tableCell'>상태</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell align='center'>
                                    <div className='cellWrapper'>
                                        <img src={row.img} alt='' className='image' />
                                        {row.product}
                                    </div>
                                </TableCell>
                                <TableCell align='left'>{row.customer}</TableCell>
                                <TableCell align='left'>{row.date}</TableCell>
                                <TableCell align='left'>{row.amount}</TableCell>
                                <TableCell align='left'>{row.method}</TableCell>
                                <TableCell align='left'>
                                    <span className={`status ${row.status}`}>{statusKor[row.status]}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TableList;

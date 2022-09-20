import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Moment from 'moment';

import './modalDetails.scss';

interface ModalDetailsProps {
    open: any
    handleClose: any
    data: any
}

export default function ModalDetails({
    open,
    handleClose,
    data
}: ModalDetailsProps) {
    const {
        reviewDate,
        link,
        shopName,
        productType1,
        productType2,
        price,
        reviewContent,
        reviewImages,
        reviewVideos,
        orderId,
        shippingCode,
        totalPrice,
        isReceived,
        isReviewed,
        reasonNoReview,
        reviewer,
        customer
    } = data;  

    const handleShowImg = () => {
        if (reviewImages?.length > 0) {
            return reviewImages?.map((item: any) => <img className="product-detail__img" src={item}></img>);
        }        
    };

    const handleShowVideo = () => {
        console.log(reviewVideos)
        if (reviewVideos?.length > 0) {
            return reviewVideos?.map((item: any) => 
                <video className="product-detail__video" width="120" controls>
                    <source src={item} type="video/mp4"></source>
                </video>
            );
        } 
    };

    return(
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Product Detail</DialogTitle>
                <DialogContent>
                    <table>
                        <tr className="product-detail">
                            <td className="product-detail__lable">Tên Shop</td>
                            <td className="product-detail__text">{shopName}</td>                            
                        </tr>
                        <tr className="product-detail">
                            <td className="product-detail__lable">Ngày</td>
                            <td className="product-detail__text">{Moment(reviewDate).format('DD/MM/YYYY')}</td>                       
                        </tr>
                        <tr className="product-detail">
                            <td className="product-detail__lable">Link SP</td>
                            <td className="product-detail__text">{link}</td>                       
                        </tr>
                        <tr className="product-detail">
                            <td className="product-detail__lable">Phân loại 1</td>
                            <td className="product-detail__text">{productType1}</td>                       
                        </tr>
                        <tr className="product-detail">
                            <td className="product-detail__lable">Phân loại 2</td>
                            <td className="product-detail__text">{productType2}</td>                       
                        </tr>
                        <tr className="product-detail">
                            <td className="product-detail__lable">Giá SP</td>
                            <td className="product-detail__text">{price}</td>                       
                        </tr>
                        <tr className="product-detail">
                            <td className="product-detail__lable">Nội dung review</td>
                            <td className="product-detail__text">{reviewContent}</td>                       
                        </tr>
                        <tr className="product-detail">
                            <td className="product-detail__lable">Hình ảnh review</td>
                            <td className="product-detail__text">
                                {handleShowImg()}
                            </td>                       
                        </tr>
                        <tr className="product-detail">
                            <td className="product-detail__lable">Video review</td>
                            <td className="product-detail__text">
                                {handleShowVideo()}
                            </td>                       
                        </tr>
                        <tr className="product-detail">
                            <td className="product-detail__lable">Mã đặt đơn</td>
                            <td className="product-detail__text">{orderId}</td>                       
                        </tr>
                        <tr className="product-detail">
                            <td className="product-detail__lable">Mã vận đơn</td>
                            <td className="product-detail__text">{shippingCode}</td>                       
                        </tr>
                        <tr className="product-detail">
                            <td className="product-detail__lable">Đã nhận</td>
                            <td className="product-detail__text">{isReceived ? "Yes" : "No"}</td>                       
                        </tr>
                        <tr className="product-detail">
                            <td className="product-detail__lable">Đã review</td>
                            <td className="product-detail__text">{isReviewed ? "Yes" : "No"}</td>                       
                        </tr>
                        <tr className="product-detail">
                            <td className="product-detail__lable">Số tiền đơn hàng</td>
                            <td>{totalPrice}</td>                       
                        </tr>
                        <tr className="product-detail">
                            <td className="product-detail__lable">Lý do không review</td>
                            <td className="product-detail__text">{reasonNoReview}</td>                       
                        </tr>
                        <tr className="product-detail">
                            <td className="product-detail__lable">Tài khoản</td>
                            <td className="product-detail__text">{reviewer}</td>                       
                        </tr>
                        <tr className="product-detail">
                            <td className="product-detail__lable">Khách</td>
                            <td className="product-detail__text">{customer}</td>                       
                        </tr>
                    </table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="outlined">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import { UploadImages, UploadVideos } from '../../components/ui';

import './dialog.scss';

interface FormDialogProps {
    open: any
    user: any
    handleClose: any
    data: any
    onChange: any
    handleFormSubmit: any
    onImagesChange: any
    onVideosChange: any
}

export default function FormDialog({
    open,
    handleClose,
    data,
    user,
    onChange,
    handleFormSubmit,
    onImagesChange,
    onVideosChange
}: FormDialogProps) {
    const {
        _id,
        reviewDate,
        link,
        shopName,
        productType1,
        productType2,
        price,
        reviewContent,
        reviewImages,
        orderId,
        shippingCode,
        totalPrice,
        isReceived,
        isReviewed,
        reasonNoReview,
        reviewer,
        customer,
        keyWord
    } = data;

    const custumdate = reviewDate == null ? "" : reviewDate?.split('.');

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{_id ? "Update product" : "Create new product"}</DialogTitle>
                <DialogContent>
                    <form>
                        {
                            !user?.isCustomer && (
                                <>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isReceived}
                                                onChange={e => onChange(e)}
                                                name="isReceived"
                                                id="isReceived"
                                                color="primary"
                                            />
                                        }
                                        label="???? nh???n"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isReviewed}
                                                onChange={e => onChange(e)}
                                                name="isReviewed"
                                                id="isReviewed"
                                                color="primary"
                                            />
                                        }
                                        label="???? review"
                                    />
                                </>
                            )
                        }
                        <div className='row'>
                            <div className="col-sm-6">
                                <TextField id="shopName" value={shopName} onChange={e => onChange(e)} placeholder="Nh???p t??n shop" label="T??n shop" margin="dense" fullWidth />
                            </div>
                            <div className="col-sm-6">
                                <TextField id="link" value={link} onChange={e => onChange(e)} placeholder="Nh???p link sp" label="link" margin="dense" fullWidth />
                            </div>
                            <div className="col-sm-6">
                                <TextField
                                    id="reviewDate"
                                    type="datetime-local"
                                    onChange={e => onChange(e)}
                                    value={custumdate[0]}
                                    placeholder="Nh???p ng??y"
                                    label="Ng??y"                                    
                                    margin="dense"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </div>
                            <div className="col-sm-6">
                                <TextField id="keyWord" value={keyWord} onChange={e => onChange(e)} placeholder="Nh???p keyword" label="keyword" margin="dense" fullWidth />
                            </div>
                            <div className="col-sm-6">
                                <TextField id="productType1" value={productType1} onChange={e => onChange(e)} placeholder="Nh???p ph??n lo???i 1" label="Ph??n lo???i 1" margin="dense" fullWidth />
                            </div>
                            <div className="col-sm-6">
                                <TextField id="productType2" value={productType2} onChange={e => onChange(e)} placeholder="Nh???p ph??n lo???i 2" label="Ph??n lo???i 2" margin="dense" fullWidth />
                            </div>
                            <div className="col-sm-6">
                                <TextField id="price" value={price} onChange={e => onChange(e)} placeholder="Nh???p gi?? sp" label="Gi??" margin="dense" fullWidth />
                            </div>
                            {
                                !user?.isCustomer && (
                                    <>
                                        <div className="col-sm-6">
                                            <TextField id="orderId" value={orderId} onChange={e => onChange(e)} placeholder="Nh???p m?? ?????t ????n" label="M?? ?????t ????n" margin="dense" fullWidth />
                                        </div>
                                        <div className="col-sm-6">
                                            <TextField id="shippingCode" value={shippingCode} onChange={e => onChange(e)} placeholder="Nh???p m?? v???n ????n" label="M?? v???n ????n" margin="dense" fullWidth />
                                        </div>
                                        <div className="col-sm-6">
                                            <TextField id="totalPrice" value={totalPrice} onChange={e => onChange(e)} placeholder="Nh???p s??? ti???n ????n h??ng" label="S??? ti???n ????n h??ng" margin="dense" fullWidth />
                                        </div>
                                        <div className="col-sm-6">
                                            <TextField id="reviewer" value={reviewer} onChange={e => onChange(e)} placeholder="Nh???p t??i kho???n" label="T???i kho???n" margin="dense" fullWidth />
                                        </div>
                                        <div className="col-sm-6">
                                            <TextField id="customer" value={customer} onChange={e => onChange(e)} placeholder="Nh???p kh??ch" label="Kh??ch" margin="dense" fullWidth />
                                        </div>
                                    </>
                                )
                            }
                        </div>
                        <div className='row'>
                            <div className='col-md-6 col-sm-12'>
                                <UploadImages onChange={onImagesChange} />
                            </div>
                            <div className='col-md-6 col-sm-12'>
                                <UploadVideos width={150} height={150} onChange={onVideosChange} />
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <TextField id="reviewContent" multiline minRows={3} value={reviewContent} onChange={e => onChange(e)} placeholder="Nh???p n???i dung review" label="N???i dung review" margin="dense" fullWidth />
                        </div>
                        {
                            !user?.isCustomer && (
                                <div className="col-xs-12">
                                    <TextField id="reasonNoReview" value={reasonNoReview} onChange={e => onChange(e)} multiline minRows={3} placeholder="Nh???p l?? do kh??ng review" label="L?? do kh??ng review" margin="dense" fullWidth />
                                </div>
                            )
                        }
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={() => handleFormSubmit()} color="primary" variant="contained">
                        {_id ? "Update" : "Submit"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
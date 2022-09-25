import React, { useState, useEffect, useRef, useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid, Button, IconButton } from '@material-ui/core';
import { Delete, Edit, Info, CloudDownloadOutlined } from '@material-ui/icons';
import httpClient from '../../lib/apiRequest';
import FormDialog from '../../layouts/dialog/Dialog';
import ModalDetails from '../../layouts/modal/ModalDetails';
import Moment from 'moment';
import { AppContext } from '../../index';
import fileDownload from 'js-file-download'
import Header from '../../layouts/header';

import './products.scss';
import axios from 'axios';

const initialValue = {
    _id: "",
    reviewDate: "",
    link: "",
    shopName: "",
    productType1: "",
    productType2: "",
    price: "",
    reviewContent: "",
    reviewImages: "",
    orderId: "",
    shippingCode: "",
    totalPrice: "",
    isReceived: false,
    isReviewed: false,
    reasonNoReview: "",
    reviewer: "",
    customer: ""
};

function Product() {
    const [gridApi, setGridApi] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [formData, setFormData] = useState(initialValue);
    const imageList = useRef<File[]>()
    const videoList = useRef<File[]>()
    const user = useContext(AppContext) as unknown as { id: string, username: string, email: string, roles: string[] }
    console.log("user", user)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenModal(false);
        setFormData(initialValue)
    };

    const columnDefs = [
        { headerName: "STT", field: "", width: 50, maxWidth: 60, resizable: true, cellRenderer: (params: any) => params.rowIndex },
        { headerName: "Tên shop", field: "shopName" },
        { headerName: "Ngày", field: "reviewDate", cellRenderer: (params: any) => Moment(params.value).format('DD/MM/YYYY') },
        { headerName: "Đã nhận", field: "isReceived", cellRenderer: (params: any) => params.data.isReceived == true ? "x" : "" },
        { headerName: "Đã review", field: "isReviewed", cellRenderer: (params: any) => params.data.isReviewed == true ? "x" : "" },
        { headerName: "Lý do không review", field: "reasonNoReview" },
        { headerName: "Tài khoản", field: "reviewer" },
        { headerName: "Khách", field: "customer" },
        {
            headerName: "Actions", field: "_id", cellRendererFramework: (params: any) => <div>
                <IconButton>
                    <Edit color="primary" onClick={() => handleUpdate(params.data)} />
                </IconButton>
                <IconButton>
                    <Delete color="secondary" onClick={() => handleDelete(params.value)} />
                </IconButton>
                <IconButton>
                    <Info color="primary" onClick={() => handleShowDetail(params.data)} />
                </IconButton>
                <IconButton>
                    <CloudDownloadOutlined color="primary" onClick={() => handleDownload([...params?.data?.reviewImages, ...params?.data?.reviewVideos])} />
                </IconButton>
            </div>
        }
    ];

    const defaultColDef = {
        sortable: true,
        flex: 5,
        resizable: true,
        wrapText: true,
        wrapHeaderText: true,
        autoHeight: true
    }

    const handleDownload = (urls: string[]) => {
        if (!urls || urls.length <= 0) {
            return
        }
        for (const url of urls) {
            const fileName = url?.split('/')?.at(-1)
            if (!fileName) {
                break
            }
            axios.get(url, {
                responseType: 'blob',
            })
                .then((res: any) => {
                    fileDownload(res.data, fileName)
                })
        }
    }
    const onGridReady = (params: any) => {
        setGridApi(params)
    }

    const onChange = (e: any) => {
        const { value, id, checked } = e.target;
        setFormData({ ...formData, [id]: value, [e.target.name]: checked })
    }

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const { data } = await httpClient.get("/product/search");

        if (data) {
            setTableData(data.products)
        }
    }

    const handleUpdate = (oldData: any) => {

        setFormData(oldData);
        handleClickOpen();
    };

    const handleShowDetail = (data: any) => {
        setFormData(data);
        setOpenModal(true);
    }

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("Are you sure, you want to delete this row");
        if (confirm) {
            const { data } = await httpClient.delete(`/product/delete/${id}`);

            if (data && data._id) {
                getUsers();
            }
        }
    };

    const handleFormSubmit = async () => {
        if (formData._id) {
            const bodyUpdate = {
                id: formData._id,
                reviewDate: formData.reviewDate,
                link: formData.link,
                shopName: formData.shopName,
                productType1: formData.productType1,
                productType2: formData.productType2,
                price: formData.price,
                reviewContent: formData.reviewContent,
                reviewImages: formData.reviewImages,
                orderId: formData.orderId,
                shippingCode: formData.shippingCode,
                totalPrice: formData.totalPrice,
                isReceived: formData.isReceived,
                isReviewed: formData.isReviewed,
                reasonNoReview: formData.reasonNoReview,
                reviewer: formData.reviewer,
                customer: formData.customer,
                updatedBy: user.id
            }

            const { data } = await httpClient.put("/product/update", bodyUpdate);

            if (data && data._id) {
                handleClose();
                getUsers();
            }
        } else {
            const bodyCreate = {
                reviewDate: formData.reviewDate,
                link: formData.link,
                shopName: formData.shopName,
                productType1: formData.productType1,
                productType2: formData.productType2,
                price: formData.price,
                reviewContent: formData.reviewContent,
                reviewImages: formData.reviewImages,
                orderId: formData.orderId,
                shippingCode: formData.shippingCode,
                totalPrice: formData.totalPrice,
                isReceived: formData.isReceived,
                isReviewed: formData.isReviewed,
                reasonNoReview: formData.reasonNoReview,
                reviewer: formData.reviewer,
                customer: formData.customer,
                updatedBy: user.id,
                createdBy: user.id
            }

            const { imageUrls, videoUrls } = await uploadMedia();
            const { data } = await httpClient.post("/product/create", { ...bodyCreate, reviewImages: imageUrls, reviewVideos: videoUrls });

            if (data && data._id) {
                handleClose();
                getUsers();
            }
        }
    };

    const uploadMedia = async () => {
        let imageUrls = [];
        let videoUrls = [];
        if (imageList.current) {
            const imagesFormData = new FormData();
            console.log(imagesFormData)
            for (const file of imageList.current) {
                imagesFormData.append('files', file);
            }
            const result = await httpClient.post("/attachment/uploadMultiple", imagesFormData)
            imageUrls = result.data
        }

        if (videoList.current) {
            const videoFormData = new FormData();
            for (const file of videoList.current) {
                videoFormData.append('files', file);
            }
            const result = await httpClient.post("/attachment/uploadMultiple", videoFormData)
            videoUrls = result.data
        }

        return { imageUrls, videoUrls }
    }

    const onImagesChange = (files: File[]) => {
        imageList.current = files
    }

    const onVideosChange = (files: File[]) => {
        videoList.current = files
    }

    return (
        <>
            <Header />
            <div className="product">
                <h3 style={{
                    display: 'block',
                    padding: '1rem'
                }}>Products</h3>
                <hr />
                <Grid container justifyContent="flex-end" style={{
                    padding: '0.75rem',
                }}>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>Add product</Button>
                </Grid>
                <div className="ag-theme-alpine" style={{ padding: '0.75rem', height: '450px' }}>
                    <AgGridReact
                        rowData={tableData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                        pagination={true}
                    />
                </div>
                <FormDialog
                    open={open}
                    user={user}
                    handleClose={handleClose}
                    data={formData}
                    onChange={onChange}
                    handleFormSubmit={handleFormSubmit}
                    onImagesChange={onImagesChange}
                    onVideosChange={onVideosChange}

                />
                <ModalDetails
                    open={openModal}
                    handleClose={handleClose}
                    data={formData}
                />
            </div>
        </>
    )
}

export default Product;
import React from 'react'
import MUIDataTable from "mui-datatables"
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from "@material-ui/core";


const columns = [
  {
    name: "name",
    label: "Name",
    options: {
      sort: true,
      filter: false
    }
  },
  {
    name: "serialNumber",
    label: "Serial Number",
    options: {
      sort: true,
      filter: false
    }
  },
  {
    name: "quantity",
    label: "Quantity",
    options: {
      sort: true,
      filter: true
    }
  },
  {
    name: "category",
    label: "Category",
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: "status",
    label: "Status",
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: "cost",
    label: "Cost (MYR)",
    options: {
      sort: true,
      filter: false
    }
  },
  {
    name: "salePrice",
    label: "Sale Price (MYR)",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "createdAt",
    label: "Created At",
    options: {
      sort: false,
      filter: false
    }
  }
]

const data = [
  {
    name: "Spoon",
    serialNumber: "787162800230",
    quantity: 1,
    category: "Metal",
    status: "Store",
    cost: 69,
    salePrice: 90,
    createdAt: Date.now()
  },
  {
    name: "Fork",
    serialNumber: "287162261230",
    quantity: 9,
    category: "Metal",
    status: "Store",
    cost: 12,
    salePrice: 40,
    createdAt: Date.now()
  },
  {
    name: "Guitar",
    serialNumber: "987987800230",
    quantity: 1,
    category: "Metal",
    status: "Room",
    cost: 45,
    salePrice: 55,
    createdAt: Date.now()
  },
  {
    name: "Rice",
    serialNumber: "007162800230",
    quantity: 3,
    category: "Goods",
    status: "Store",
    cost: 32,
    salePrice: 89,
    createdAt: Date.now()
  },
  {
    name: "Speaker",
    serialNumber: "413162990230",
    quantity: 2,
    category: "Metal",
    status: "Room",
    cost: 58,
    salePrice: 20,
    createdAt: Date.now()
  },
  {
    name: "Bowl",
    serialNumber: "787162836201",
    quantity: 3,
    category: "Goods",
    status: "Room",
    cost: 88,
    salePrice: 910,
    createdAt: Date.now()
  },
]

const options = {
  filterType: 'checkbox' as any,
}

const useTableStyles = makeStyles((_theme) => ({
  titleWrapper: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  mainTitle: {
    marginRight: '10px'
  },
  subTitle: {
    marginLeft: '10px'
  }
}))

export default function Inventories(): JSX.Element {
  const classes = useTableStyles()

  const getTableTitle = () => {
    return (
      <div className={classes.titleWrapper}>
        <Typography className={classes.mainTitle} component="span" variant="h5" color="primary" noWrap>
          <span>AstraZenga</span>
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Typography className={classes.subTitle} component="span" variant="subtitle1" noWrap>
          <span>Inventories</span>
        </Typography>
      </div>
    )
  }

  return (
    <React.Fragment>
      <MUIDataTable
        title={getTableTitle()}
        data={data}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  )
}

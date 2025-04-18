import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axiosInstance from "../../apis/axios";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import ItemCard from "../../components/ItemCard";

function WishItems() {
  const [itemList, setItemList] = useState(null);

  useEffect(() => {
    axiosInstance.get("/api/wish", { params: { done: false } }).then((res) => {
      setItemList(res.data);
    });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <MDBox pt={2} pb={2} px={2}>
          <Grid container spacing={2}>
            {itemList === null
              ? null
              : itemList.map((item, idx) => (
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={idx}>
                    <ItemCard
                      itemId={item.itemId}
                      title={item.title}
                      description={item.description}
                      category={item.category}
                      image={item.imageUrl}
                      createdTime={item.createdTime}
                      viewCount={item.viewCount}
                      wishCount={item.wishCount}
                      route={`/wish/${item.itemId}`}
                    />
                  </Grid>
                ))}
          </Grid>
        </MDBox>
      </Grid>
    </Grid>
  );
}

export default WishItems;

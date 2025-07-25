import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import { useState } from "react";

function ProfileInfoCard({ title, user, handleClickEdit }) {
  const userFields = [
    { label: "닉네임", value: user.nickname },
    { label: "ID", value: user.uniqueId },
    { label: "이름", value: user.name },
    { label: "학부", value: user.department },
    { label: "MBTI", value: user.mbti },
    {
      label: "관심 목록",
      value: Array.isArray(user.interestItemCategory) ? user.interestItemCategory.join(", ") : " ",
    },
  ];

  const userInfo = userFields.map(({ label, value }) => (
    <MDBox key={label} display="flex" flexDirection="row" alignItems="center" justifyContent="left">
      <MDTypography variant="h6" fontWeight="bold" color="info" gutterBottom>
        {label}
      </MDTypography>
      <MDTypography variant="button" color="text" fontWeight="bold" gutterBottom>
        &nbsp;&nbsp;{value}
      </MDTypography>
    </MDBox>
  ));

  return (
    <MDBox
      bgColor="white"
      borderRadius="lg"
      sx={{ borderColor: "grey.300", height: "100%" }}
      border={2}
      shadow="md"
    >
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDTypography
          variant="body2"
          color="secondary"
          sx={{ cursor: "pointer" }}
          onClick={handleClickEdit}
        >
          <Tooltip title="프로필 수정" placement="top">
            <Icon>edit</Icon>
          </Tooltip>
        </MDTypography>
      </MDBox>

      <MDBox p={2}>
        <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="bold">
            {user.introduction}
          </MDTypography>
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        {userInfo}
      </MDBox>
    </MDBox>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  handleClickEdit: PropTypes.func.isRequired,
};

export default ProfileInfoCard;

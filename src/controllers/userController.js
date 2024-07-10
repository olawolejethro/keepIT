/** @format */

const { User, Organization, UserOrganisations } = require("../../models");
const { Op } = require("sequelize");

exports.getUserById = async function (req, res, next) {
  // Fetch user data
  try {
    const userId = req.params.id;
    // Fetch the authenticated user's ID from the token

    // Check if the requested user is the authenticated user
    const existingUser = await User.findOne({ userId });

    if (!existingUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User record retrieved successfully",
      data: {
        userId: existingUser.userId,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        phone: existingUser.phone,
      },
    });

    // Check if the authenticated user belongs to or created the same organizations as the requested user
    // const organisations = await UserOrganisations.findAll({
    //   where: { userId },
    //   include: {
    //     model: Organization,
    //     as: "organizations",
    //     through: { attributes: [] },
    //   },
    // });

    // const orgIds = organisations.map((org) => org.orgId);

    // const userInSameOrg = await UserOrganisations.findOne({
    //   where: {
    //     userId,
    //     orgId: {
    //       [Op.in]: orgIds,
    //     },
    //   },
    // });

    // if (!userInSameOrg) {
    //   return res.status(403).json({
    //     status: "error",
    //     message: "Access denied",
    //   });
    // }

    // const user = await User.findOne({ userId });
    // if (!user) {
    //   return res.status(404).json({
    //     status: "error",
    //     message: "User not found",
    //   });
    // }

    // return res.status(200).json({
    //   status: "success",
    //   message: "User record retrieved successfully",
    //   data: {
    //     userId: user.userId,
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email: user.email,
    //     phone: user.phone,
    //   },
    // });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

## ASIA-PROPERTY ( Backend )

Made with ExpressJS ( Node.js ) & MongoDB, API link - https://asia-property.herokuapp.com

### API Endpoints & Response Examples :

#### Users Endpoints

| Method | Endpoint                                   | Description                   |
| ------ | ------------------------------------------ | ----------------------------- |
| POST   | `/users/register`                          | register as a user            |
| POST   | `/users/login`                             | login as a user/admin         |
| GET    | `/users/get`                               | get all users data            |
| GET    | `/users/get-by-id/${user_id}`              | get user data by id           |
| PUT    | `/users/update?id=${user_id}`              | update user data by id        |
| PUT    | `/users/update-user-profile?id=${user_id}` | update user details as a user |
| DELETE | `/users/delete?id=${user_id}`              | delete user by id             |

| Register Field |
| -------------- |
| username       |
| email          |
| phone_number   |
| password       |
| image          |

| Login Field |
| ----------- |
| email       |
| password    |

| GetAllUsers Field |
| ----------------- |
| `no_any_field`    |

| GetUserById Field      |
| ---------------------- |
| `access-token` (admin) |

| UpdateUserById Field   |
| ---------------------- |
| `access-token` (admin) |
| username               |
| email                  |
| phone_number           |
| role                   |
| image                  |

| UpdateUserProfile Field |
| ----------------------- |
| `access-token` (user)   |
| username                |
| email                   |
| phone_number            |
| image                   |

| DeleteUserById Field   |
| ---------------------- |
| `access-token` (admin) |

#### Users GetAll Response

```javascript
{
  "status": "success",
  "message": "Successfully get all users.",
  "results": [
    {
      "role": "user",
      "image": "https://asia-property.herokuapp.com/public/uploads/2021-06-13--08:14:51-default-user.png",
      "_id": "60c49fbda02e303a0b7a2b14",
      "username": "propertyuser",
      "email": "propertyuser@gmail.com",
      "phone_number": "081288880002",
      "password": "$2b$08$rSpIqlHRwHOZYEVIlS9zHONwP1uwnWXyzbHa66v7neZD.Gk3GFmWq",
      "created_at": "2021-06-12T11:51:25.391Z",
      "updated_at": "2021-06-13T08:14:51.162Z",
    },
    {
      "role": "admin",
      "image": "https://asia-property.herokuapp.com/public/uploads/2021-06-13--08:16:44-default-user.png",
      "_id": "60c49fd6a02e303a0b7a2b15",
      "username": "propertyadmin",
      "email": "propertyadmin@gmail.com",
      "phone_number": "081288880003",
      "password": "$2b$08$NTT4yIyg.GlPoW21QTlNW.RWQjtH71B0OtYq8wn8WoeDJ/ceQAFI2",
      "created_at": "2021-06-12T11:51:50.021Z",
      "updated_at": "2021-06-13T08:16:44.029Z",
    }
  ]
}
```

#### RealEstates Endpoints

| Method | Endpoint                                                              | Description                                 |
| ------ | --------------------------------------------------------------------- | ------------------------------------------- |
| POST   | `/real-estate/create`                                                 | create a new real estate data               |
| PUT    | `/real-estate/update?id=${realestate_id}`                             | update a real estate data                   |
| GET    | `/real-estate/get`                                                    | get all real estates data                   |
| GET    | `/real-estate/get-by-id/${realestate_id}`                             | get real estate data by id                  |
| GET    | `/real-estate/get-inquiries`                                          | get inquiries or featured real estates data |
| GET    | `/real-estate/search?search_query=${query}&type=${for-rent/for-sale}` | search real estates data                    |
| DELETE | `/real-estate/delete?id=${realestate_id}`                             | delete real estate by id                    |

| CreateRealEstate Field                          |
| ----------------------------------------------- |
| `access-token` (admin)                          |
| name                                            |
| agent `(the input value should be an agent_id)` |
| type                                            |
| images[ ] `(can_multiple)`                      |
| price                                           |
| is_featured                                     |
| is_renting                                      |
| bedroom_count                                   |
| bathroom_count                                  |
| building_size                                   |
| description                                     |
| status                                          |
| address                                         |
| country                                         |
| city                                            |

| UpdateRealEstate Field                          |
| ----------------------------------------------- |
| `access-token` (admin)                          |
| name                                            |
| agent `(the input value should be an agent_id)` |
| type                                            |
| images[ ] `(can_multiple)`                      |
| price                                           |
| is_featured                                     |
| is_renting                                      |
| bedroom_count                                   |
| bathroom_count                                  |
| building_size                                   |
| description                                     |
| status                                          |
| address                                         |
| country                                         |
| city                                            |

| GetAllRealEstates Field |
| ----------------------- |
| `no_any_field`          |

| GetRealEstateById Field |
| ----------------------- |
| `no_any_field`          |

| GetInquiries or GetFeaturedRealEstates Field |
| -------------------------------------------- |
| `no_any_field`                               |

| DeleteRealEstate Field |
| ---------------------- |
| `access-token` (admin) |

#### RealEstates GetAll Response

```javascript
{
  "status": "success",
  "message": "Successfully get all real estates.",
  "results": [
    {
      "images": [
        "https://asia-property.herokuapp.com/2021-07-18--14:04:06-default-user.png",
        "https://asia-property.herokuapp.com/2021-07-18--14:04:06-default-agent-pic.jpg"
      ],
      "type": "house",
      "price": "1.000.000.000",
      "is_featured": false,
      "is_renting": true,
      "bedroom_count": 5,
      "bathroom_count": 3,
      "building_size": 88,
      "description": "this is the description of the house data.",
      "status": "available",
      "country": "indonesia",
      "city": "batam",
      "address": "Kecamatan Bengkong, Bengkong Laut",
      "_id": "60f434d6fbba829a87ff3ffa",
      "name": "House 01",
      "agent": {
        "image": "https://asia-property.herokuapp.com/public/uploads/2021-06-13--13:03:26-default-agent-pic.jpg",
        "country": "singapore",
        "city": "singapore",
        "_id": "60bca4fd033e1d38148d6703",
        "name": "sg-agent-99",
        "email": "sg-agent-99@gmail.com",
        "phone_number": "085800088905"
      },
      "created_at": "2021-07-18T14:04:06.424Z",
      "updated_at": "2021-07-18T14:10:19.211Z",
    },
    {
      "images": [
        "https://asia-property.herokuapp.com/2021-07-18--14:12:59-default-user.png",
        "https://asia-property.herokuapp.com/2021-07-18--14:12:59-default-agent-pic.jpg"
      ],
      "type": "apartment",
      "price": "1.000.000.000",
      "is_featured": false,
      "is_renting": false,
      "bedroom_count": 3,
      "bathroom_count": 2,
      "building_size": 54,
      "description": "this is the description of the apartment data",
      "status": "available",
      "country": "indonesia",
      "city": "batam",
      "address": "Kecamatan Batam Kota, Komplek Kintamani Blok B no 8",
      "_id": "60f436ebc014959da2a3e824",
      "name": "Apartment 02",
      "agent": {
        "image": "https://asia-property.herokuapp.com/public/uploads/2021-06-13--13:03:26-default-agent-pic.jpg",
        "country": "indonesia",
        "city": "tanjung pinang",
        "_id": "60bca4fd033e1d38148d6703",
        "name": "fred+agent+2",
        "email": "fred+agent+2@gmail.com",
        "phone_number": "085800000002"
      },
      "created_at": "2021-07-18T14:12:59.326Z",
      "updated_at": "2021-07-18T14:12:59.327Z",
    },
  ]
}
```

#### Agents Endpoints

| Method | Endpoint                        | Description             |
| ------ | ------------------------------- | ----------------------- |
| POST   | `/agents/create`                | create a new agent data |
| PUT    | `/agents/update?id=${agent_id}` | update a agent data     |
| GET    | `/agents/get`                   | get all agents data     |
| GET    | `/agents/get-by-id/${agent_id}` | get agent data by id    |
| DELETE | `/agents/delete?id=${agent_id}` | delete agent by id      |

| CreateAgent Field      |
| ---------------------- |
| `access-token` (admin) |
| name                   |
| email                  |
| phone_number           |
| image                  |
| country                |
| city                   |

| UpdateAgent Field      |
| ---------------------- |
| `access-token` (admin) |
| name                   |
| email                  |
| phone_number           |
| image                  |
| country                |
| city                   |

| GetAllAgents Field |
| ------------------ |
| `no_any_field`     |

| GetAgentById Field |
| ------------------ |
| `no_any_field`     |

| DeleteAgent Field      |
| ---------------------- |
| `access-token` (admin) |

#### Agents GetAll Response

```javascript
{
  "status": "success",
  "message": "Successfully get all agents.",
  "results": [
    {
      "image": "https://asia-property.herokuapp.com/public/uploads/2021-06-13--13:03:07-default-agent-pic.jpg",
      "country": "indonesia",
      "city": "batam",
      "_id": "60bc9f5c033e1d38148d6702",
      "name": "fred+agent+1",
      "email": "fred+agent+1@gmail.com",
      "phone_number": "085800000001",
      "created_at": "2021-06-06T10:11:40.657Z",
      "updated_at": "2021-06-13T13:03:07.276Z",
    },
    {
      "image": "https://asia-property.herokuapp.com/public/uploads/2021-06-13--13:03:26-default-agent-pic.jpg",
      "country": "indonesia",
      "city": "tanjung pinang",
      "_id": "60bca4fd033e1d38148d6703",
      "name": "fred+agent+2",
      "email": "fred+agent+2@gmail.com",
      "phone_number": "085800000002",
      "created_at": "2021-06-06T10:35:41.091Z",
      "updated_at": "2021-06-13T13:03:26.194Z",
    }
  ]
}
```

#### Wishlists Endpoints

| Method | Endpoint                                                               | Description                            |
| ------ | ---------------------------------------------------------------------- | -------------------------------------- |
| POST   | `/wishlist/create`                                                     | create a new wishlist data             |
| GET    | `/wishlist/get`                                                        | get all wishlist data                  |
| GET    | `/wishlist/get-by-user-id/${user_id}`                                  | get wishlist data that the user_id has |
| DELETE | `/wishlist/delete?user_id=${user_id}&real_estate_id=${real_estate_id}` | delete wishlist by id                  |

| CreateWishlist Field  |
| --------------------- |
| `access-token` (user) |
| userId                |
| realEstateId          |

| GetAllWishlists Field  |
| ---------------------- |
| `access-token` (admin) |

| GetWishlistByUserId Field |
| ------------------------- |
| `access-token` (user)     |

| DeleteWishlist Field  |
| --------------------- |
| `access-token` (user) |

#### Wishlists Get by Userid Response

```javascript
{
  "status": "success",
  "message": "Successfully get wishlist list by user of propertyuser.",
  "results": {
    "_id": "60f44a0e43ee54ad217292fd",
    "user": {
      "role": "user",
      "image": "public/images/default-user.png",
      "_id": "60f43d032e63cfa12462367c",
      "username": "propertyuser",
      "email": "propertyuser@gmail.com",
      "phone_number": "081288880003",
    },
    "wishlists": [
      {
        "images": [
          "https://asia-property.herokuapp.com/2021-07-18--14:04:06-default-user.png",
          "https://asia-property.herokuapp.com/2021-07-18--14:04:06-default-agent-pic.jpg"
        ],
        "type": "apartment",
        "price": "1.000.000.000",
        "is_featured": false,
        "is_renting": true,
        "bedroom_count": 3,
        "bathroom_count": 2,
        "building_size": 54,
        "description": "this is the description of the apartment data.",
        "status": "available",
        "country": "indonesia",
        "city": "batam",
        "address": "Kecamatan Batam Kota, Komplek Kintamani Blok B no 8",
        "_id": "60f434d6fbba829a87ff3ffa",
        "name": "Apartment 01",
        "agent": {
          "image": "https://asia-property.herokuapp.com/public/uploads/2021-06-13--13:03:26-default-agent-pic.jpg",
          "country": "indonesia",
          "city": "tanjung pinang",
          "_id": "60bca4fd033e1d38148d6703",
          "name": "fred+agent+2",
          "email": "fred+agent+2@gmail.com",
          "phone_number": "085800000002",
        },
      },
      {
        "images": [
          "https://asia-property.herokuapp.com/2021-07-18--14:13:03-default-user.png",
          "https://asia-property.herokuapp.com/2021-07-18--14:13:03-default-agent-pic.jpg"
        ],
        "type": "apartment",
        "price": "1.000.000.000",
        "is_featured": false,
        "is_renting": false,
        "bedroom_count": 3,
        "bathroom_count": 2,
        "building_size": 54,
        "description": "this is the description of the apartment data",
        "status": "available",
        "country": "indonesia",
        "city": "batam",
        "address": "Kecamatan Batam Kota, Komplek Kintamani Blok B no 8",
        "_id": "60f436efc014959da2a3e825",
        "name": "Apartment 88",
        "agent": {
          "image": "https://asia-property.herokuapp.com/public/uploads/2021-06-13--13:03:26-default-agent-pic.jpg",
          "country": "indonesia",
          "city": "tanjung pinang",
          "_id": "60bca4fd033e1d38148d6703",
          "name": "fred+agent+2",
          "email": "fred+agent+2@gmail.com",
          "phone_number": "085800000002",
        },
      }
    ]
  }
}
```

---

Backend References :

- mongoDB handbook & setup: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
- multiple uploads: https://codeforgeek.com/multiple-file-upload-node-js/ & https://codeforgeek.com/multiple-file-upload-node-js/
- receiving array upload : https://stackoverflow.com/questions/12756688/is-it-possible-to-send-an-array-with-the-postman-chrome-extension
- create local mongoDB connection: https://zellwk.com/blog/local-mongodb/

---

Personal Note :

- In a Real Project, store the images to a cloud storage that can stay for a long time. Like on AWS / GCP / other cloud system. Because storing on heroku, it only stays temporary.
- After made changes on local, and you want to push to Heroku, do :

1. do `heroku whoami` ( make sure you logged in with the account that have access to your heroku )
2. if you have pushed to github earlier, then dont need to do `git add .` & `git commit -am "your_message_here'`
3. after step 2, do `git push heroku master`

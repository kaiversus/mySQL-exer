# C03 - Blog MySQL

## 1. Phân tích chức năng các trang

### Trang Home (Dark Mode)

- Xem danh sách "Recent blog posts" (bài nổi bật)
- Xem danh sách "All blog posts" có phân trang
- Mỗi bài hiển thị: ảnh, ngày, tác giả, tiêu đề, mô tả ngắn, các tag
- Bấm vào 1 bài để chuyển sang trang Detail
- Bật/tắt Dark/Light mode
- Điều hướng menu: Blog, Projects, About, Newsletter

### Trang Detail Blog

- Tương tự trang Home ở một số chỗ: xem recent blog posts, navigation bar, bật/tắt theme
- Hiển thị rõ nội dung của 1 blog cụ thể kèm tên blog, ngày tháng, tags
- Có khung nhập dữ liệu (email) cho user

### Trang Project

- Tương tự ở: navigation bar, bật/tắt theme
- Hiển thị danh sách project, mỗi project kèm tên project, thông tin, tags

### Trang Newsletter

- Tương tự ở: navigation bar, bật/tắt theme
- Khung nhập email người dùng
- Xem all blog, thực chất là danh sách một số bài blog gần nhất hoặc nổi bật nhất kèm tên, mô tả và tags

### Trang About

- Tương tự ở: navigation bar, bật/tắt theme
- Hiển thị toàn bộ thông tin tóm tắt của người dùng (avatar + profile)

---

## 2. Danh sách thực thể dữ liệu (Data Entity List)

| Entity | Attribute |
| --- | --- |
| **posts** | id (int) - NOT NULL - PK - AUTO_INCREMENT<br>heading (varchar(255)) - NOT NULL<br>date (datetime) - NOT NULL<br>admins_id - NOT NULL<br>body (text) - NOT NULL<br>image (varchar(255)) - NULL<br>description (text) - NOT NULL<br>type (varchar(50)) - NOT NULL |
| **admins** | id (int) - NOT NULL - PK - AUTO_INCREMENT<br>username (varchar(50)) - NOT NULL<br>email (varchar(100)) - NOT NULL - UNIQUE<br>password (varchar(255)) - NOT NULL |
| **subscribers** | id (int) - NOT NULL - PK - AUTO_INCREMENT<br>email (varchar(100)) - NOT NULL - UNIQUE<br>date (datetime) - NOT NULL |
| **tags** | id (int) - NOT NULL - PK - AUTO_INCREMENT<br>name (varchar(100)) - NOT NULL - UNIQUE |
| **posts_tags** | posts_id - NOT NULL<br>tags_id - NOT NULL<br>PRIMARY KEY (posts_id, tags_id) |
| **profiles** | profile_id (int) - NOT NULL - PK - AUTO_INCREMENT<br>admins_id - NOT NULL - FK<br>full_name (varchar(100)) - NOT NULL<br>avatar (varchar(255)) - NULL<br>about_me (text) - NULL<br>skills (text) - NULL<br>experiences (text) - NULL<br>educations (text) - NULL |

---

## 3. Lược đồ cơ sở dữ liệu

```
admins(id PK AI, username, email UNIQUE, password)
profiles(admin_id PK & FK->admins.id, full_name, avatar, about_me, skills, experiences, educations)
posts(id PK AI, admin_id FK->admins.id, type, heading, description, body, image NULL, date)
tags(id PK AI, name UNIQUE)
posts_tags(post_id FK->posts.id, tag_id FK->tags.id, PRIMARY KEY(post_id, tag_id))
subscribers(id PK AI, email UNIQUE, date)
```

---

## 4. Quan hệ giữa các bảng

| Quan hệ | Kiểu |
| --- | --- |
| posts - admins | n - 1 |
| posts - posts_tags | 1 - n |
| posts_tags - tags | n - 1 |
| admins - profiles | 1 - 1 |

---

## 5. Bảng API Endpoints

### posts

| Method | Endpoint | Chức năng | Quyền |
| --- | --- | --- | --- |
| GET | /api/posts?type=post&page=1&tag=design | List + phân trang + lọc tag | Public |
| GET | /api/posts/:id | Chi tiết 1 bài | Public |
| POST | /api/posts | Tạo bài | Admin |
| PUT | /api/posts/:id | Sửa bài | Admin |
| DELETE | /api/posts/:id | Xóa bài | Admin |

### tags

| Method | Endpoint | Chức năng | Quyền |
| --- | --- | --- | --- |
| GET | /api/tags?name=design | Lọc 1 tag | Public |
| GET | /api/tags?name=design\|development | Lọc nhiều tag | Public |
| POST | /api/tags | Thêm tag | Admin |
| PUT | /api/tags/:id | Sửa tag | Admin |
| DELETE | /api/tags/:id | Xóa tag | Admin |

### subscribers

| Method | Endpoint | Chức năng | Quyền |
| --- | --- | --- | --- |
| GET | /api/subscribers/:id | Tìm user | Admin |
| GET | /api/subscribers?date=... | Tìm users theo ngày | Admin |
| POST | /api/subscribers | User nhập mail | Public |
| PUT | /api/subscribers/:id | Sửa thông tin user | Admin |
| DELETE | /api/subscribers/:id | Xóa user | Admin |

### admins

| Method | Endpoint | Chức năng | Quyền |
| --- | --- | --- | --- |
| POST | /api/auth/login | Đăng nhập admin | Admin |
| PUT | /api/admins/me | Đổi thông tin | Admin |
| PUT | /api/admins/me/password | Đổi mật khẩu | Admin |
| DELETE | /api/admins/:id | Xóa tài khoản admin | Admin |

### profiles

| Method | Endpoint | Chức năng | Quyền |
| --- | --- | --- | --- |
| GET | /api/profiles/:id | Vào trang profile admin | Public |
| PUT | /api/profiles/:id | Sửa thông tin | Admin |

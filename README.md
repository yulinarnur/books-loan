# Books Loan Application with Express js and Mysql
Aplikasi ini merupakan aplikasi untuk melakukan transaksi manajemen peminjaman dan pengembalian buku.

## Entity Relation Diagram
Berikut adalah relasi atau hubungan antar tabel. 
- One to Many (book to borrowed_book): Satu buku dapat memiliki banyak catatan peminjaman
- One to Many (users to borrowed_book & penalty): Satu user dapat melakukan banyak peminjaman buku
- One to One (borrowed_book to penalty): Satu peminjaman memiliki satu catatan penalti/sanksi
- One to Many (users to pinalty): Satu user memiliki banyak catatan penalti/sanksi

![image](https://github.com/user-attachments/assets/a4de1f60-ce3e-4678-b51a-bc282fbc7453)


## Use Case

 - Anggota dapat meminjam buku dengan ketentuan
    - [ ]  Anggota tidak boleh meminjam lebih dari 2 buku
    - [ ]  Buku yang dipinjam tidak sedang dipinjam oleh anggota lain
    - [ ]  Anggota saat ini tidak sedang dikenakan sanksi
- Anggota mengembalikan buku dengan ketentuan
    - [ ]  Buku yang dikembalikan adalah buku yang telah dipinjam oleh anggota tersebut
    - [ ]  Jika buku dikembalikan setelah lebih dari 7 hari, anggota akan dikenakan 	sanksi. Anggota yang dikenakan sanksi tidak dapat meminjam buku selama 3 	hari
- Periksa buku
    - [ ]  Menampilkan semua buku yang ada dan jumlahnya
    - [ ]  Buku yang sedang dipinjam tidak dihitung
- Periksa anggota
    - [ ]  Menampilkan semua anggota yang ada
    - [ ]  Jumlah buku yang sedang dipinjam oleh setiap anggota
 
## Dokumentasi API
Swagger :
  ![image](https://github.com/user-attachments/assets/d1941165-3e07-40d4-abbb-f4e12039c834)


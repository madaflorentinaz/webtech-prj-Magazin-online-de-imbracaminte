FloryManagement

    Aplicatia FloryManagement este o aplicatie de administrare a depozitului si se adreseaza proprietarilor magazinelor de imbracaminte. Aceasta aplicatie contine o baza de date "db", 
care la randul ei contine o tabela"articoles", tabela "articoles" este formata din 4 campuri:id(incrementat automat), denumire, tip_material
si culoare.
    Pentru a realiza baza de date am folosit mysql, nodeadmin si sequelize pentru a putea face conexiunea si a definii modelul tabelei.
Pentru stocarea persistenta am folosit comenzile CRUD (create, read, update and delete), fiecare comanda crud are asociata o interogare a bazei de date.
Sper exemplu: POST se foloseste pentru a insera in tabela elemente, GET se foloseste pentru a extrage din tabela (in cazul acestei aplicatii
am folosit "get" pentru a extrage datele din tabela "articoles" si a le afisa in tebelul din interfata, PUT este pentru update iar DELETE 
pentru a sterge.
    Pentru interfata aplicatiei am folosit mai multe limbaje, printre care: HTML, CSS etc. Fiind o aplicatie single page application am folosit
si Angular JS. Interfata aplicatiei permite proprietarului sa adauge noi articole vestimentare, sa modifice campurile si sa stearga articolele 
care nu mai exista in stoc.

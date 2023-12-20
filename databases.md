1. Database: 
Tablas para el item/carrito:  Juguetes.

```
    DROP TABLE IF EXISTS item;
    CREATE TABLE item(
        product_id INTEGER PRIMARY KEY NOT NULL,
        product_name VARCHAR(50) NOT NULL,
        licence_name VARCHAR(50) NOT NULL,
        price INTEGER, 
        imagen VARCHAR(90)
    );

    DROP TABLE IF EXISTS cart;
    CREATE TABLE cart(
        cart_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER, 
        total_price_product INTEGER,
        PRIMARY KEY (cart_id, product_id),
        FOREIGN KEY (product_id) REFERENCES item(product_id) ON DELETE CASCADE
    );
    
    INSERT INTO item (product_id, product_name, licence_name, price, imagen) VALUES
	 (1,'Baby Yoda Blueball','aLICENCE_name', 1799.99,'/img/star-wars/baby-yoda-1.webp'),
	 (2,'Boba Fett Fighter','aLICENCE_name', 1799.99,'/img/star-wars/bobbafeth-1.webp'),
	 (3,'Luke Skylwalker & Grogu','aLICENCE_name', 1799.99,'/img/star-wars/luke-1.webp'),
	 (4,'Stormtrooper Lightsaber','aLICENCE_name', 1799.99,'/img/star-wars/trooper-1.webp'),
	 (5,'Charmander Smiley','aLICENCE_name', 1799.99,'/img/pokemon/charmander-1.webp'),
	 (6,'Dragonite Hi!','aLICENCE_name', 1799.99,'/img/pokemon/dragonite-1.webp'),
	 (7,'Pidgeotto Flying','aLICENCE_name', 1799.99,'/img/pokemon/pidgeotto-1.webp'),
	 (8,'Pikachu Smiley','aLICENCE_name', 1799.99,'/img/pokemon/pikachu-1.webp'),
	 (9,'Vulpix Fancy','aLICENCE_name', 1799.99,'/img/pokemon/vulpix-1.webp'),
	 (10,'Harry Potter & Hegwid','aLICENCE_name', 1799.99,'/img/harry-potter/harry-1.webp'),
	 (11,'Herminione Ball Dress','aLICENCE_name', 1799.99,'/img/harry-potter/hermione-1.webp'),
	 (12,'Luna Lovegood Lion Mask','aLICENCE_name', 1799.99,'/img/harry-potter/luna-1.webp'),
	 (13,'Snape Patronus','aLICENCE_name', 1799.99,'/img/harry-potter/snape-patronus-1.webp');

``` 


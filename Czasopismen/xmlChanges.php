
<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    list("field" => $field, "value" => $value, "type" => $type ) = json_decode(file_get_contents('php://input'), true);

	header("Content-type: text/xml");
	$doc= new DOMDocument();
	$doc->load("./src/assets/czasopisma.xml");

    switch($type){
        case "add":
            // dodanie danych (na koniec)
            $dane=$doc->getElementsByTagName('zmienne');
            $el=$doc->createElement($field,$value);
            $dane[0]->appendChild($el);
            break;
        case "delete":
            // usunięcie
            $parent = $doc->getElementsByTagName('zmienne')->item(0);
            $childs = $doc->getElementsByTagName($field);
            $el=$childs->item(3);
            //$parent->removeChild($el);
            $el->parentNode->removeChild($el);
            break;
        case "update":
            // zamiana
            $new = $doc->createElement($field,$value);
            $childs = $doc->getElementsByTagName($field);
            $old = $childs->item(0);
            $old->parentNode->replaceChild($new, $old);
            break;
    }
	
	
	$doc->save("./src/assets/czasopisma.xml");
    echo $doc->saveXML();

	?>
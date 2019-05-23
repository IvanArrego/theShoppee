<?php
    function error_handler($error){
        $output = [
            'success'=>false,
            'error' => $error->getMessage(),
        ];
            $json_output = json_encode($output['error']);
            // http_response_code(500);
            print($json_output);
    }


?>
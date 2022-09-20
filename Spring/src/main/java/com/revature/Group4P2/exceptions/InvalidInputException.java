package com.revature.Group4P2.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(value = HttpStatus.UNAUTHORIZED)//this is response code 401
public class InvalidInputException extends Exception{
    public InvalidInputException(String message) {
        super(message);
    }
}
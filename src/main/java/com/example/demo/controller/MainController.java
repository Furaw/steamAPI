package com.example.demo.controller;

import com.example.demo.entity.Case;
import com.example.demo.repository.CaseRepository;
import com.google.gson.JsonObject;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import static org.springframework.data.repository.init.ResourceReader.Type.JSON;


@Controller
public class MainController {

    CaseRepository caseRepository;

    @Autowired
    public MainController(CaseRepository caseRepository) {
        this.caseRepository = caseRepository;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/getAllCases")
    @ResponseBody
    public List<Case> getAllCases(Model model){
        caseRepository.findAll();
        model.addAttribute("cases", caseRepository.findAll());
        return caseRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/addCase")
    @ResponseBody
    public String addCase(@RequestBody Case smallcase){

        caseRepository.save(smallcase);
        String inputLine = "{success:true}";
        StringBuffer response = new StringBuffer();
        response.append(inputLine);

        //print in String
        System.out.println(response.toString());
        return  response.toString();

    }



    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/updateCaseById")
    @ResponseBody
    public String updateCaseById(@RequestBody Case smallCase)  {
      Case smallcase =  caseRepository.findById(smallCase.getId()).orElse(null);
      smallcase.setId(smallCase.getId());
      smallcase.setName(smallCase.getName());
      caseRepository.save(smallcase);
        String inputLine = "{success:true}";
        StringBuffer response = new StringBuffer();
        response.append(inputLine);

        //print in String
        System.out.println(response.toString());
        return  response.toString();

    }


    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/deleteCaseById")
    @ResponseBody
    public String deleteCaseById(@RequestBody Case smallCase){
        caseRepository.deleteById(Long.valueOf(smallCase.getId()));

               String inputLine = "{success:true}";
        StringBuffer response = new StringBuffer();
                    response.append(inputLine);

        //print in String
        System.out.println(response.toString());
        return  response.toString();

    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/getPrice")
    @ResponseBody
    public String asd(@RequestParam String caseName) throws IOException, JSONException {
        String url = "https://steamcommunity.com/market/priceoverview/?appid=730&currency=18&market_hash_name="
                +caseName+"%20Case";
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        // optional default is GET
        con.setRequestMethod("GET");
        //add request header
        con.setRequestProperty("User-Agent", "Mozilla/5.0");
        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'GET' request to URL : " + url);
        System.out.println("Response Code : " + responseCode);
        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        //print in String
        System.out.println(response.toString());
        return  response.toString();
        /*JsonObject value = new JsonObject();
        value.addProperty("lowest_price", "123");
        value.addProperty("median_price", "32");
        return value.toString();*/
    }

}





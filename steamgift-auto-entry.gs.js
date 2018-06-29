function autoEntry() {
    var cookie = "PHPSESSID=PHPSESSID_HERE";
    var headers = {
        "Cookie": cookie,
        "referer": "www.steamgifts.com"
    };
    var options = {
        "headers": headers
    };
    var url = "https://www.steamgifts.com";
    var response = UrlFetchApp.fetch(url, options);

    var content = response.getContentText("UTF-8");
    var content = content.replace(/^\r\n+/gm, "");
    var content = content.replace(/^\s+/gm, "");

    var giveaway_url = content.replace(/<!DOCTYPE html>[\s\S]*featured__inner-wrap">\r<a href="/g, "");
    var giveaway_url = giveaway_url.replace(/" class="[\s\S]*<\/html>/g, "");
    Logger.log(giveaway_url); // /giveaway/UYZYx/pixel-puzzles-2-anime

    var giveaway_id = giveaway_url.match(/\/giveaway\/(.{5})\/.*/)[1];
    Logger.log(giveaway_id); // UYZYx

    var content = response.getContentText("UTF-8");
    var xsrf_token = content.match(/<input type="hidden" name="xsrf_token" value="(.*)" \/>/)[1];
    Logger.log(xsrf_token); // 7cedeb7634606c8adc9f680fd0489d5d


    var ajax_url = "https://www.steamgifts.com/ajax.php";

    var payload = {
        "xsrf_token": xsrf_token,
        "do": "entry_insert",
        "code": giveaway_id
    };
    var headers = {
        "Cookie": cookie,
        "referer": "https://www.steamgifts.com" + giveaway_url // https://www.steamgifts.com/giveaway/RlhGw/bounty-hunter-ocean-diver
    };
    var options = {
        "method": "POST",
        "payload": payload,
        "headers": headers
    };
    var response = UrlFetchApp.fetch(ajax_url, options);

    Logger.log(response);
}
{
    e <= 12 ? (l = "itemSet",
        n = e - 7,
        s = 5) : (l = "itemBootSet",
            n = e - 23,
            s = 6);
    var o = {};
    for (i = s; i >= 2; i--) {
        var h = l + i;
        for (a in t[h]) {
            var m = a.substr(0, 5 * (i - 1) - 1);
            t[h] && "undefined" !== typeof t[h][a] && ("undefined" === typeof o[m] && (o[m] = 0),
                o[m] += t[h][a][0])
        }
    }
    var u = {};
    for (i = n; i >= 1; i--) {
        var p = l + i;
        if ("undefined" !== typeof t[p])
            for (a in t[l + n]) {
                "undefined" === typeof d[a] && (d[a] = [0, 0]);
                var x = a.substr(0, 5 * i - 1);
                if (t[p] && "undefined" !== typeof t[p][x]) {
                    var _ = a.substr(0, 5 * (i + 1) - 1);
                    u[a] = i === n ? 1 : "undefined" !== typeof t[l + (i + 1)][_] ? t[l + (i + 1)][_][0] / o[x] * u[a] : 0;
                    d[a][0] += parseInt(t[p][x][0] * u[a]);
                    d[a][1] += parseInt(t[p][x][1] * u[a]);
                }
            }
    }

    for (i = n + 1; i <= s; i++) {
        if (typeof t[l + i] === 'undefined') continue;
        for (a in t[l + i]) {
            if (typeof d[a.substr(0, n * 5 - 1)] === 'undefined') d[a.substr(0, n * 5 - 1)] = [0, 0];
            d[a.substr(0, n * 5 - 1)][0] += t[l + i][a][0];
            d[a.substr(0, n * 5 - 1)][1] += t[l + i][a][1];
        }
    }

    for (a in d) {
        let z_score = 2.326;
        let z_score_squared = 5.410276;
        let winrate = d[a][1] / d[a][0];
        let winrate_adj = Math.max(winrate - 1 / (2 * d[a][0]));
        let nwins_adj = winrate_adj * d[a][0];
        let nlosses_adj = d[a][0] - nwins_adj;
        let lower_bound = (nwins_adj + z_score_squared / 2) / (d[a][0] + z_score_squared) - z_score / (d[a][0] + z_score_squared) * Math.sqrt((nwins_adj * nlosses_adj) / d[a][0] + z_score_squared / 4);
        c.push([a, d[a][0], d[a][0] * lower_bound]);    // use this if you want the lower bound of the confidence interval
        // c.push([a, d[a][0], d[a][1]]);               // use this if you want the raw winrate (not recommended to sort by winrate if you do)
    }

    c.sort(function (e, t) {
        return t[2] / t[1] - e[2] / e[1]                // use this return to sort by winrate
        // return t[1] - e[1]                           // use this return to sort by pickrate
    }
    );
    console.log("Lolalytics Extrap Override is installed");
}
module monitor_conditions(
    input [7:0] temp, hum, pres,
    output reg [1:0] alert_level
);
    always @(*) begin
        if (temp > 50 || pres < 950) begin
            alert_level = 2'b11; // Critical alert
        end else if (temp > 40 || pres < 980 ) begin
            alert_level = 2'b10; // Moderate alert
        end else if (temp > 35 || pres < 990) begin
            alert_level = 2'b01; // Mild alert
        end else begin
            alert_level = 2'b00; // Normal condition
        end
    end
endmodule


package com.datn.laptopshop.config.Oauth2;

import com.datn.laptopshop.config.JWTService;
import com.datn.laptopshop.service.IUserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.datn.laptopshop.entity.User;
import java.io.IOException;
import java.net.URLEncoder;

@Component
public class OAuthLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private IUserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        CustomOAuth2User u = ((CustomOAuth2User) authentication.getPrincipal());
        System.out.println("user ben login success: "+ u);
        // Tạo token
        String token = jwtService.generateToken(u);
        String refreshToken = jwtService.generateToken(u);
        userService.saveUserToken(userService.findUserByEmailGG(u.getUsername()),token);
        String role = "ROLE_USER";
        String img = u.getImg();
        String name = URLEncoder.encode(u.getName(), "UTF-8");;
        boolean hasRole = authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if(hasRole){
            role = "ROLE_ADMIN";
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"token\": \"" + token + "\"}");

        String redirectUrl = "http://technoshop.id.vn/auth/sign-in"
                + "?token=" + token
                + "&refreshToken="+refreshToken
                + "&role="+ role
                + "&name="+ name
                + "&img="+img;
        response.sendRedirect(redirectUrl);

    }
}